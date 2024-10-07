import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const copy = async () => {
    const DIR_FROM = path.resolve(__dirname, 'files/');
    const DIR_TO =  path.resolve(__dirname, 'files_copy/');

    const ERROR_MESSAGE = 'FS operation failed'

    if (!await isAccess(DIR_FROM) || await isAccess(DIR_TO)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    try {
        await fs.cp(DIR_FROM, DIR_TO, { recursive: true });
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

await copy();
