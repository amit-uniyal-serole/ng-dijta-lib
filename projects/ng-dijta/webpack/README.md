# @ngdx/dijta/webpack

Node-only build helper for Module Federation remotes that consume `@ngdx/dijta`.

## Installation

```bash
npm install @ngdx/dijta
```

The `@ngdx/dijta/webpack` sub-path is included in the main package — no extra install required.

## Usage

Replace your remote's verbose webpack configuration with a single `withDxRemote(...)` call:

```js
// webpack.config.js (remote app)
const { withDxRemote } = require('@ngdx/dijta/webpack');
const { withModuleFederation } = require('@nx/angular/module-federation');

module.exports = withDxRemote({
  name: 'myRemote',
  exposes: {
    './MyModule': './src/app/my-feature/my-feature.module.ts',
  },
});
```

The helper returns a webpack config that includes:

- `output.uniqueName` set to `name`
- `output.publicPath: 'auto'`
- `experiments.outputModule: true`
- A `ModuleFederationPlugin` with a pre-built `shared` map (all singletons)
- A `DefinePlugin` that defines `__APP_NAMESPACE__` as the remote name

## Shared packages

The following packages are shared as singletons across all remotes, using version ranges from `DX_PEER_RANGES`:

| Package | Range key |
|---------|-----------|
| `@angular/core` | `DX_PEER_RANGES.angular` |
| `@angular/common` | `DX_PEER_RANGES.angular` |
| `@angular/router` | `DX_PEER_RANGES.angular` |
| `@angular/forms` | `DX_PEER_RANGES.angular` |
| `@angular/material` | `DX_PEER_RANGES.material` |
| `@angular/cdk` | `DX_PEER_RANGES.material` |
| `@jsverse/transloco` | `DX_PEER_RANGES.transloco` |
| `@ngdx/dijta` | `DX_PEER_RANGES.dijta` |

## `extraShared` — add or override entries

Pass `extraShared` to merge additional packages on top of the defaults. This does **not** replace the default map.

```js
module.exports = withDxRemote({
  name: 'myRemote',
  exposes: { './MyModule': './src/...' },
  extraShared: {
    'my-state-library': { singleton: true, requiredVersion: '^2.0.0' },
    // Override a default range:
    '@angular/core': { singleton: true, strictVersion: false, requiredVersion: '^18.0.0' },
  },
});
```

## `DX_PEER_RANGES` — peer-range upgrade workflow

`DX_PEER_RANGES` is the single source of truth for all shared version ranges:

```js
const { DX_PEER_RANGES } = require('@ngdx/dijta/webpack');
console.log(DX_PEER_RANGES);
// { angular: '^18.2.0', material: '^18.1.0', transloco: '^7.5.0', dijta: '^18.10.0' }
```

**Upgrade flow:**

1. `@ngdx/dijta` maintainer bumps the relevant range in `peer-ranges.js` and publishes a new minor.
2. Each remote runs `npm i @ngdx/dijta@latest`.
3. Updated ranges automatically apply at the next webpack build — no per-remote config change needed.

## Escape hatch

If the `@ngdx/dijta/webpack` sub-path does not resolve correctly in your environment (e.g., an older bundler that ignores `package.json` `exports`), install the separate `@ngdx/dijta-webpack` package instead. Its API is identical.

## Implementation notes

This helper is plain Node.js CommonJS — it has no Angular dependencies and does not go through ng-packagr's Angular compilation pipeline. It is distributed as-is under `dist/ng-dijta/webpack/` and exposed via the `./webpack` entry in the package `exports` map.
