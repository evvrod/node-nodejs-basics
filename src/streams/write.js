import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'fs';
import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const write = async () => {
    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'fileToWrite.txt';

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;

    const ERROR_MESSAGE = 'FS operation failed'

    if (!await isAccess(PATH_TO_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    await pipeline(process.stdin.resume(), createWriteStream(PATH_TO_FILE));
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
await write();