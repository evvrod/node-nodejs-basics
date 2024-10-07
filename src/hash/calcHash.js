import fs from 'node:fs/promises';
import { createReadStream } from 'fs'
import { pipeline } from 'node:stream/promises';
import { createHash } from 'node:crypto';
import os from 'node:os';
import path from 'path';

const __dirname = import.meta.dirname;

const calculateHash = async () => {
    const HASH_TYPE = 'sha256';

    const DIR = path.resolve(__dirname, 'files/');
    const FILENAME = 'fileToCalculateHashFor.txt';

    const ERROR_MESSAGE = 'FS operation failed'

    const PATH_TO_FILE = `${DIR}/${FILENAME}`;
    const PATH_TO_NEW_FILE = `${DIR}/${"ddd"}`;

    if (!await isAccess(PATH_TO_FILE)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    try {
        await pipeline(
            createReadStream(PATH_TO_FILE),
            createHash(HASH_TYPE).digest('hex'),
            process.stdout,
            { end: false });
        console.log(os.EOL)
    }
    catch (error) {
        console.log(error)
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

await calculateHash();