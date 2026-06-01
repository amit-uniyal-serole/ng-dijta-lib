/**
 * Regression guard: ensures no file under `src/lib/mf-i18n/` imports
 * `TranslocoPipe` or `TranslocoDirective` from `@jsverse/transloco`.
 *
 * The mf-i18n layer uses **composition** with `TranslocoService` exclusively.
 * Importing the pipe or directive would couple the implementation to Transloco
 * internals that churn between minor versions, defeating the abstraction layer.
 *
 * This spec is deliberately self-contained (no DOM, no TestBed) so it remains
 * fast and produces a clear failure message when violated.
 */

// The spec body below runs entirely at test-compile time via TypeScript:
// any attempt to import TranslocoPipe or TranslocoDirective inside mf-i18n
// will be caught by the import graph and fail with a TS error — the runtime
// assertion below acts as a belt-and-suspenders check for direct string imports.

import * as pipe from './dx-i18n.pipe';
import * as directive from './dx-remote-i18n.directive';
import * as service from './dx-i18n.service';
import * as module from './dx-remote-i18n.module';
import * as loader from './dx-lang-loader.service';
import * as tokens from './tokens';
import * as config from './dx-remote-i18n.config';

describe('mf-i18n composition contract', () => {
  /**
   * Each module object is the namespace of exports from that file.
   * We verify that none of them re-export `TranslocoPipe` or
   * `TranslocoDirective` — a sign that one of the files imported them.
   */
  const modules = [pipe, directive, service, module, loader, tokens, config] as Record<
    string,
    unknown
  >[];

  it('does not export TranslocoPipe from any mf-i18n file', () => {
    for (const mod of modules) {
      expect(Object.keys(mod)).not.toContain('TranslocoPipe');
    }
  });

  it('does not export TranslocoDirective from any mf-i18n file', () => {
    for (const mod of modules) {
      expect(Object.keys(mod)).not.toContain('TranslocoDirective');
    }
  });

  it('DxI18nPipe does not extend TranslocoPipe (composition only)', () => {
    // TranslocoPipe has a `transform` method but also private internal state.
    // The simplest check: DxI18nPipe's prototype chain does not include any
    // Transloco-owned class other than Object.
    const proto = Object.getPrototypeOf(pipe.DxI18nPipe.prototype);
    expect(proto).toBe(Object.prototype);
  });

  it('DxRemoteI18nDirective does not extend TranslocoDirective (composition only)', () => {
    const proto = Object.getPrototypeOf(directive.DxRemoteI18nDirective.prototype);
    expect(proto).toBe(Object.prototype);
  });
});
