import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const read = async () => {
    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'fileToRead.txt';

    const ERROR_MESSAGE = 'FS operation failed';

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;

    if (!await isAccess(PATH_TO_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    try {
        const data = await fs.readFile(PATH_TO_FILE, 'utf8');
        console.log(data);
    }
    catch (e) {
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

await read();