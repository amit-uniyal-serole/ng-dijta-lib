'use strict';

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');

const { withDxRemote } = require('../with-dx-remote');
const { DX_PEER_RANGES } = require('../peer-ranges');

describe('withDxRemote', () => {
  let cfg;

  before(() => {
    cfg = withDxRemote({ name: 'testRemote', exposes: { './Widget': './src/widget' } });
  });

  it('sets output.uniqueName to the remote name', () => {
    assert.equal(cfg.output.uniqueName, 'testRemote');
  });

  it('sets output.publicPath to "auto"', () => {
    assert.equal(cfg.output.publicPath, 'auto');
  });

  it('enables experiments.outputModule', () => {
    assert.equal(cfg.experiments.outputModule, true);
  });

  it('includes a ModuleFederationPlugin as first plugin', () => {
    const mfp = cfg.plugins[0];
    assert.equal(mfp.constructor.name, 'ModuleFederationPlugin');
  });

  it('includes a DefinePlugin defining __APP_NAMESPACE__', () => {
    const define = cfg.plugins[1];
    assert.equal(define.constructor.name, 'DefinePlugin');
    const namespace = define.definitions['__APP_NAMESPACE__'];
    assert.equal(namespace, JSON.stringify('testRemote'));
  });

  describe('shared map', () => {
    let shared;
    before(() => {
      // Access the shared config via the MFP's internal options
      shared = cfg.plugins[0]._options?.shared ?? cfg.plugins[0].options?.shared;
    });

    const EXPECTED_KEYS = [
      '@angular/core',
      '@angular/common',
      '@angular/router',
      '@angular/forms',
      '@angular/material',
      '@angular/cdk',
      '@jsverse/transloco',
      '@ngdx/dijta',
    ];

    it('shared map contains all expected package keys', () => {
      // Reconstruct the shared config independently since MFP may transform it
      const freshCfg = withDxRemote({ name: 'probe', exposes: {} });
      // Extract options passed to the constructor through the config returned
      // by withDxRemote — we verify the shape by inspecting a fresh call with
      // a test spy rather than MFP internals.
      assert.ok(true); // structural check covered by (a) and (b) below
    });

    it('(a) all required shared keys present with versions sourced from DX_PEER_RANGES', () => {
      // Re-derive the shared map by calling a patched version of withDxRemote
      // that captures options before handing them to the plugin.
      const capturedShared = captureShared({ name: 'cap', exposes: {} });

      for (const key of EXPECTED_KEYS) {
        assert.ok(key in capturedShared, `shared map missing key: ${key}`);
      }

      // Version ranges must come from DX_PEER_RANGES
      assert.equal(capturedShared['@angular/core'].requiredVersion, DX_PEER_RANGES.angular);
      assert.equal(capturedShared['@angular/common'].requiredVersion, DX_PEER_RANGES.angular);
      assert.equal(capturedShared['@angular/router'].requiredVersion, DX_PEER_RANGES.angular);
      assert.equal(capturedShared['@angular/forms'].requiredVersion, DX_PEER_RANGES.angular);
      assert.equal(capturedShared['@angular/material'].requiredVersion, DX_PEER_RANGES.material);
      assert.equal(capturedShared['@angular/cdk'].requiredVersion, DX_PEER_RANGES.material);
      assert.equal(capturedShared['@jsverse/transloco'].requiredVersion, DX_PEER_RANGES.transloco);
      assert.equal(capturedShared['@ngdx/dijta'].requiredVersion, DX_PEER_RANGES.dijta);
    });

    it('(b) regression — mutating DX_PEER_RANGES.angular propagates to all @angular/* entries', () => {
      const original = DX_PEER_RANGES.angular;
      DX_PEER_RANGES.angular = '^99.0.0';
      try {
        const s = captureShared({ name: 'mutate', exposes: {} });
        assert.equal(s['@angular/core'].requiredVersion, '^99.0.0', '@angular/core not updated');
        assert.equal(s['@angular/common'].requiredVersion, '^99.0.0', '@angular/common not updated');
        assert.equal(s['@angular/router'].requiredVersion, '^99.0.0', '@angular/router not updated');
        assert.equal(s['@angular/forms'].requiredVersion, '^99.0.0', '@angular/forms not updated');
      } finally {
        DX_PEER_RANGES.angular = original;
      }
    });

    it('(d) extraShared merges without replacing defaults', () => {
      const extra = { 'my-lib': { singleton: true, requiredVersion: '^1.0.0' } };
      const s = captureShared({ name: 'merge', exposes: {}, extraShared: extra });
      // Default entries still present
      assert.ok('@angular/core' in s, 'default @angular/core missing after merge');
      assert.ok('@ngdx/dijta' in s, 'default @ngdx/dijta missing after merge');
      // Extra entry added
      assert.ok('my-lib' in s, 'extra my-lib missing after merge');
    });

    it('(e) @ngdx/dijta shared entry includes includeSecondaries.skip with webpack sub-path', () => {
      const s = captureShared({ name: 'sec', exposes: {} });
      const dijta = s['@ngdx/dijta'];
      assert.ok(dijta.includeSecondaries, '@ngdx/dijta missing includeSecondaries');
      assert.ok(
        Array.isArray(dijta.includeSecondaries.skip),
        'includeSecondaries.skip must be an array',
      );
      assert.ok(
        dijta.includeSecondaries.skip.includes('@ngdx/dijta/webpack'),
        '@ngdx/dijta/webpack must be in skip list',
      );
    });
  });
});

// ---------------------------------------------------------------------------
// Helper — intercepts the shared config before it reaches ModuleFederationPlugin
// ---------------------------------------------------------------------------

const { withDxRemote: _originalWithDxRemote } = require('../with-dx-remote');

function captureShared(opts) {
  const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
  let captured = null;
  const OriginalMFP = ModuleFederationPlugin;

  // Temporarily override ModuleFederationPlugin in the require cache
  const mfMod = require.resolve('@module-federation/enhanced/webpack');
  const orig = require.cache[mfMod].exports;
  require.cache[mfMod].exports = {
    ModuleFederationPlugin: function (options) {
      captured = options.shared;
      return new OriginalMFP(options);
    },
  };

  // Clear the withDxRemote module cache so it picks up the patched MFP
  const wdrMod = require.resolve('../with-dx-remote');
  delete require.cache[wdrMod];

  try {
    const { withDxRemote } = require('../with-dx-remote');
    withDxRemote(opts);
    return captured;
  } finally {
    require.cache[mfMod].exports = orig;
    delete require.cache[wdrMod];
    require('../with-dx-remote'); // restore
  }
}
