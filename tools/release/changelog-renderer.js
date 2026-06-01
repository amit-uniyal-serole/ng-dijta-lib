'use strict';
/**
 * Custom Nx Release changelog renderer.
 *
 * Wraps Nx's default renderer and, for each commit-backed change that has a
 * non-empty body, appends the body as an indented continuation block under
 * its bullet in the generated markdown. Commits without a body keep the
 * single-line bullet Nx ships by default — the change is purely additive.
 *
 * Wired up via [nx.json](../../nx.json):
 *   release.changelog.projectChangelogs.renderer = "{workspaceRoot}/tools/release/changelog-renderer.js"
 *
 * Why this exists: Nx's default renderer in
 * node_modules/nx/release/changelog-renderer/index.js emits only the commit
 * subject + scope + emoji + hash. Commit bodies (where contributors explain
 * the why of a change) never reach CHANGELOG.md or the GitHub Release UI.
 * This renderer surfaces them.
 *
 * Contributor convention (see RELEASING.md): write meaningful, paragraph-form
 * commit bodies. Anything you put in the body of a `feat:` / `fix:` /
 * `perf:` commit will appear under that release entry, indented two spaces.
 */

const defaultRenderer = require('nx/release/changelog-renderer').default;

const SIGN_OFF_LINE = /^(Co-Authored-By|Co-authored-by|Signed-off-by|signed-off-by):/i;
const BREAKING_CHANGE_LINE = /^BREAKING CHANGE:/i;
// Nx fetches commits via `git log --pretty="..." --name-status`, which appends
// per-file change lines like `A\tpath` or `M\tpath` to the body field. Those
// belong in `affectedFiles`, not in the rendered changelog entry.
const CHANGED_FILE_LINE = /^[AMDRC]\d*\s+\S+/;
// The `--pretty="..."` flag wraps each commit's output in literal double-quotes,
// leaving a lone `"` line at the start or end of the captured body.
const QUOTE_ARTIFACT = /^"\s*$/;

function cleanBody(body) {
  if (!body) return '';
  return body
    .split('\n')
    .filter((line) => !SIGN_OFF_LINE.test(line))
    .filter((line) => !BREAKING_CHANGE_LINE.test(line))
    .filter((line) => !CHANGED_FILE_LINE.test(line))
    .filter((line) => !QUOTE_ARTIFACT.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+|\s+$/g, '');
}

function indentBody(text) {
  return text
    .split('\n')
    .map((line) => (line.length === 0 ? line : '  ' + line))
    .join('\n');
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = async function changelogRenderer(config) {
  let markdown = await defaultRenderer(config);

  const changes = (config && config.changes) || [];
  for (const change of changes) {
    if (!change || !change.description) continue;
    const body = cleanBody(change.body);
    if (!body) continue;

    // Anchor on the first line of the description — the most stable element
    // of the bullet emitted by Nx's default formatChange(). The description
    // is verbatim from the commit subject; commit-reference suffixes
    // (PR/issue/hash links) come after it but don't affect matching.
    const firstLine = String(change.description).split('\n')[0];
    const linePattern = new RegExp(
      `^(-[^\\n]*${escapeRegex(firstLine)}[^\\n]*)$`,
      'm'
    );
    markdown = markdown.replace(linePattern, (match) => `${match}\n\n${indentBody(body)}\n`);
  }

  return markdown;
};
