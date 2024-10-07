import { Worker } from 'worker_threads';
import path from 'path';
import { cpus } from 'os';

const __dirname = import.meta.dirname;

const performCalculations = async () => {
    const numCPUs = cpus().length;
    const promises = [];
    for (let i = 0; i < numCPUs; i++) {
        const workerData = 10 + i;
        promises.push(createWorker(workerData));
    }

    const results = await Promise.allSettled(promises);
    const finalResults = results.map(result => {
        if (result.status === 'fulfilled') {
            return { status: 'resolved', data: result.value.data };
        } else {
            return { status: 'error', data: null };
        }
    });

    console.log(finalResults);
};

const createWorker = (data) => {
    return new Promise((resolve, reject) => {
        const workerPath = path.resolve(__dirname, 'worker.js');
        const worker = new Worker(workerPath, { type: 'module' });

        worker.postMessage(data);

        worker.on('message', (result) => resolve(result));

        worker.on('error', () => reject({ status: 'error', data: null }));

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject({ status: 'error', data: null });
            }
        });
    });
};

await performCalculations();