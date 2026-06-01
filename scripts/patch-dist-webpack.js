#!/usr/bin/env node
/**
 * Post-build script. Two responsibilities:
 *   1. Copies the Node-only webpack helper from projects/ng-dijta/webpack/
 *      into dist/ng-dijta/webpack/ and adds the "./webpack" sub-path to
 *      dist/ng-dijta/package.json exports.
 *   2. Copies doc/llms.txt into dist/ng-dijta/llms.txt so the consumer
 *      guide ships inside the npm package (consumers receive it at
 *      node_modules/@ngdx/dijta/llms.txt).
 *
 * Decision rationale (webpack): ng-packagr secondary entry points run the
 * Angular compilation pipeline (ngc + tsc). The helper is plain Node.js
 * CommonJS with no Angular APIs, so the secondary entry mechanism would
 * fail. This script is the documented escape hatch: copy-and-patch, no
 * ngc involved.
 *
 * Decision rationale (llms.txt): the file is the consumer-facing AI guide
 * and must be self-sufficient inside the published package. Source of
 * truth stays at doc/llms.txt (browsable on GitHub); this script copies
 * it into dist at build time.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'projects', 'ng-dijta', 'webpack');
const DEST = path.join(ROOT, 'dist', 'ng-dijta', 'webpack');
const DIST_PKG = path.join(ROOT, 'dist', 'ng-dijta', 'package.json');
const LLMS_SRC = path.join(ROOT, 'doc', 'llms.txt');
const LLMS_DEST = path.join(ROOT, 'dist', 'ng-dijta', 'llms.txt');

function copyDir(src, dest, exclude = []) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (exclude.includes(entry.name)) continue;
    if (entry.name.endsWith('.spec.js')) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, exclude);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy webpack helper (skip tests)
copyDir(SRC, DEST, ['__tests__']);
console.log('✓ Copied projects/ng-dijta/webpack → dist/ng-dijta/webpack');

// 2. Patch dist/ng-dijta/package.json to expose ./webpack sub-path
const pkg = JSON.parse(fs.readFileSync(DIST_PKG, 'utf-8'));
pkg.exports = pkg.exports ?? {};
pkg.exports['./webpack'] = {
  require: './webpack/index.js',
  default: './webpack/index.js',
};
fs.writeFileSync(DIST_PKG, JSON.stringify(pkg, null, 2) + '\n');
console.log('✓ Patched dist/ng-dijta/package.json — added "./webpack" export');

// 3. Copy doc/llms.txt → dist/ng-dijta/llms.txt
if (!fs.existsSync(LLMS_SRC)) {
  throw new Error(`Missing required source file: ${LLMS_SRC}`);
}
fs.copyFileSync(LLMS_SRC, LLMS_DEST);
console.log('✓ Copied doc/llms.txt → dist/ng-dijta/llms.txt');
