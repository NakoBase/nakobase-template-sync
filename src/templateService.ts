import { fetchFilesFromRepo } from './api.js';
import { saveFileToLocal } from './fileHandler.js';

export const syncAutomatedReleaseTemplate = async () => {
  try {
    const files = await fetchFilesFromRepo({
      filePath: 'templates/automated-release',
    });

    if (!files) {
      console.error('Failed to download the files from GitHub.');
      return;
    }

    files.forEach((file) => {
      switch (file.name) {
        case '.releaserc.yml':
        case '.pr-release-template':
          saveFileToLocal({
            destPath: `./${file.name}`,
            fileData: file.content,
          });
          break;
        case 'create-release-pr.yml':
        case 'release.yml':
          saveFileToLocal({
            destPath: `./.github/workflows/${file.name}`,
            fileData: file.content,
          });
          break;
        case 'README.md':
          break;
        default:
          console.log(`Unknown file: ${file.name}`);
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const syncCommitlintTemplate = async () => {
  try {
    const files = await fetchFilesFromRepo({
      filePath: 'templates/lint/commitlint',
    });

    if (!files) {
      console.error('Failed to download the files from GitHub.');
      return;
    }

    files.forEach((file) => {
      switch (file.name) {
        case 'commitlint.config.js':
          saveFileToLocal({
            destPath: `./${file.name}`,
            fileData: file.content,
          });
          break;
        case 'README.md':
          break;
        default:
          console.log(`Unknown file: ${file.name}`);
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export const syncGithubTemplates = async () => {
  try {
    const files = await fetchFilesFromRepo({
      filePath: 'templates/github',
    });

    if (!files) {
      console.error('Failed to download the files from GitHub.');
      return;
    }

    files.forEach((file) => {
      switch (file.name) {
        case 'pull_request_template.md':
          saveFileToLocal({
            destPath: `./.github/${file.name}`,
            fileData: file.content,
          });
          break;
        case 'bug_report.md':
        case 'feature_request.md':
          saveFileToLocal({
            destPath: `./.github/ISSUE_TEMPLATE/${file.name}`,
            fileData: file.content,
          });
          break;
        case 'README.md':
          break;
        default:
          console.log(`Unknown file: ${file.name}`);
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
