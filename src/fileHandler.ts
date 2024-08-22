import fs from 'fs';
import path from 'path';

type Params = {
  fileData: string;
  destPath: string;
  overwrite?: boolean;
};

export const saveFileToLocal = ({ fileData, destPath, overwrite = true }: Params): boolean => {
  try {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    if (fs.existsSync(destPath) && !overwrite) {
      console.log(`File already exists and overwrite is disabled: ${destPath}`);
      return false;
    }

    fs.writeFileSync(destPath, fileData, 'utf8');

    console.log(`File saved to: ${destPath}`);
    return true;
  } catch (error) {
    console.error(`Failed to save file to ${destPath}: ${error}`);
    return false;
  }
};
