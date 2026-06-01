'use strict';

/**
 * Single source of truth for shared peer-dependency version ranges used by all
 * Module Federation remotes that consume @ngdx/dijta.
 *
 * Upgrade workflow:
 * 1. Bump the relevant range here.
 * 2. Publish the new @ngdx/dijta minor.
 * 3. Remotes pick up the updated ranges on their next `npm i @ngdx/dijta@latest`.
 */
const DX_PEER_RANGES = {
  /** Required version range for all @angular/* packages. */
  angular: '^18.2.0',
  /** Required version range for @angular/material and @angular/cdk. */
  material: '^18.1.0',
  /** Required version range for @jsverse/transloco. */
  transloco: '^7.5.0',
  /** Required version range for @ngdx/dijta itself. Updated on each minor release. */
  dijta: '^18.10.0',
};

module.exports = { DX_PEER_RANGES };
