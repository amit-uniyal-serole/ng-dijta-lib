'use strict';

const { DX_PEER_RANGES } = require('./peer-ranges');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const webpack = require('webpack');

/** Converts a string to a safe kebab-case filename fragment. */
function kebab(s) {
  return s
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/**
 * Builds a webpack configuration object for a Module Federation remote that
 * consumes @ngdx/dijta.
 *
 * Usage in webpack.config.js:
 * ```js
 * const { withDxRemote } = require('@ngdx/dijta/webpack');
 * module.exports = withDxRemote({ name: 'myRemote', exposes: { './MyModule': './src/...' } });
 * ```
 *
 * @param {object} options
 * @param {string} options.name        The remote's federation name (also used for __APP_NAMESPACE__).
 * @param {object} options.exposes     Module Federation `exposes` map.
 * @param {object} [options.extraShared={}]
 *   Additional or overriding entries for the `shared` map. Merged on top of
 *   the defaults — does not replace them. To pin a different version of
 *   @angular/core just include `{ '@angular/core': { requiredVersion: '...' } }`.
 * @returns {object} Webpack configuration object.
 */
function withDxRemote({ name, exposes, extraShared = {} }) {
  const defaultShared = {
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.angular,
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.angular,
    },
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.angular,
    },
    '@angular/forms': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.angular,
    },
    '@angular/material': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.material,
    },
    '@angular/cdk': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.material,
    },
    '@jsverse/transloco': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.transloco,
    },
    '@ngdx/dijta': {
      singleton: true,
      strictVersion: true,
      requiredVersion: DX_PEER_RANGES.dijta,
      // Prevent the Node-only build helper from being shared across remotes;
      // sharing it would be useless and risks duplicate-module errors.
      includeSecondaries: { skip: ['@ngdx/dijta/webpack'] },
    },
  };

  const shared = { ...defaultShared, ...extraShared };

  return {
    output: {
      uniqueName: name,
      publicPath: 'auto',
    },
    experiments: {
      outputModule: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        name,
        filename: `remoteEntry-${kebab(name)}.js`,
        exposes,
        shared,
      }),
      new webpack.DefinePlugin({
        __APP_NAMESPACE__: JSON.stringify(name),
      }),
    ],
  };
}

module.exports = { withDxRemote };
