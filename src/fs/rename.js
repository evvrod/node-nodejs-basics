import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const rename = async () => {
    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'wrongFilename.txt';

    const NEW_FILENAME = 'properFilename.md';

    const ERROR_MESSAGE = 'FS operation failed';

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;
    const PATH_TO_NEW_FILE = `${DIR}/${NEW_FILENAME}`;

    if (!await isAccess(PATH_TO_FILE) || await isAccess(PATH_TO_NEW_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }
    try {
        await fs.rename(PATH_TO_FILE, PATH_TO_NEW_FILE);
    } catch (e) {
        console.log(e);
    }
};

async function isAccess(file) {
    try {
        await fs.stat(file);
        return true;
    }
    catch {
        return false;
    }
}

await rename();