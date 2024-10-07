import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'path';

const __dirname = import.meta.dirname;

const read = async () => {
    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'fileToRead.txt';

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;

    const ERROR_MESSAGE = 'FS operation failed'

    if (!await isAccess(PATH_TO_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    await pipeline(
        createReadStream(PATH_TO_FILE),
        process.stdout,
        { end: false });
    console.log(os.EOL)
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