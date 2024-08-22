import fs from 'fs';
import path from 'path';
import os from 'os';
import { GH_TOKEN_ENV_KEY, GH_TOKEN_PATH } from './constants.js';

export const loadTokenFromConfig = (): string => {
  const homeDir = os.homedir();
  const configPath = path.join(homeDir, GH_TOKEN_PATH);

  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found at ${configPath}`);
  }

  const configContent = fs.readFileSync(configPath, 'utf8').split('\n');

  for (const line of configContent) {
    if (line.startsWith(GH_TOKEN_ENV_KEY)) {
      const token = line.split('=')[1].trim();
      if (token) {
        return token;
      }
    }
  }

  throw new Error('GH_TOKEN is missing or empty in the config file');
};
