import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const create = async () => {
    const STR = 'I am fresh and young';

    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'fresh.txt';

    const ERROR_MESSAGE = 'FS operation failed'

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;

    if (await isAccess(PATH_TO_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    try {
        await fs.writeFile(PATH_TO_FILE, STR);
    } catch (err) {
        console.log('File creation error', err);
    }
}

async function isAccess(file) {
    try {
        await fs.stat(file);
        return true;
    }
    catch {
        return false;
    }
}

await create();