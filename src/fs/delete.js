import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const remove = async () => {
    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'fileToRemove.txt';
    const ERROR_MESSAGE = 'FS operation failed';

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;

    if (!await isAccess(PATH_TO_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    await fs.unlink(PATH_TO_FILE);
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

await remove();