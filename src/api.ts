import { Octokit } from '@octokit/rest';
import { TemplateFileModel } from './model.js';
import { loadTokenFromConfig } from './config.js';
import { GH_BASE_PATH, GH_BRANCH, GH_OWNER, GH_REPO } from './constants.js';

const token = loadTokenFromConfig();

const octokit = new Octokit({
  auth: token,
});

type FetchFilesFromGithubParams = {
  owner?: string;
  repo?: string;
  branch?: string;
  filePath?: string;
};

export const fetchFilesFromRepo = async ({
  owner = GH_OWNER,
  repo = GH_REPO,
  branch = GH_BRANCH,
  filePath = GH_BASE_PATH,
}: FetchFilesFromGithubParams): Promise<TemplateFileModel[] | null> => {
  const TemplateFiles: TemplateFileModel[] = [];

  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    });

    if (Array.isArray(response.data)) {
      for (const item of response.data) {
        const files = await fetchFilesFromRepo({
          filePath: `${filePath}/${item.name}`,
        });
        if (files) {
          TemplateFiles.push(...files);
        }
      }
    } else if (response.data.type === 'file') {
      TemplateFiles.push({
        name: response.data.name,
        content: decodeContent(response.data.content),
      });
    }

    return TemplateFiles;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const decodeContent = (content: string | undefined): string => {
  if (!content) {
    throw new Error('Content is empty');
  }
  try {
    return Buffer.from(content, 'base64').toString('utf8');
  } catch (error) {
    throw new Error('Failed to decode the content');
  }
};
