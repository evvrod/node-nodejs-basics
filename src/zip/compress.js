import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const compress = async () => {
    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'fileToCompress.txt';
    const NEW_FILENAME = 'archive.gz';

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;
    const PATH_TO_NEW_FILE = `${DIR}/${NEW_FILENAME}`;

    const ERROR_MESSAGE = 'FS operation failed'

    if (!await isAccess(PATH_TO_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    try {
        await pipeline(
            createReadStream(PATH_TO_FILE),
            createGzip(),
            createWriteStream(PATH_TO_NEW_FILE)
        )
    }
    catch (e) {
        console.error(e);
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

await compress();