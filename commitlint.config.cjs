/**
 * A configuration for commitlint.
 * @see {@link https://commitlint.js.org/#/} for details.
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.match(/semantic-release-bot/)],
};
