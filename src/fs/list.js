import fs from 'node:fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const list = async () => {
    const DIR = path.resolve(__dirname, 'files/');

    const ERROR_MESSAGE = 'FS operation failed';
    
    if (!await isAccess(DIR)) {
        console.log(ERROR_MESSAGE);
        return;
    }

    const files = await fs.readdir(DIR);
    console.log(files);
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

await list();