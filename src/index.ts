#!/usr/bin/env node

import {
  syncAutomatedReleaseTemplate,
  syncCommitlintTemplate,
  syncGithubTemplates,
} from './templateService.js';
import { promptForAction } from './prompt.js';

const main = async () => {
  const action = await promptForAction();

  switch (action) {
    case 'automated-release':
      await syncAutomatedReleaseTemplate();
      break;
    case 'github-templates':
      await syncGithubTemplates();
      break;
    case 'commitlint':
      await syncCommitlintTemplate();
      break;
    case 'cancel':
      console.log('Bye!');
      process.exit(0);
  }
};

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
