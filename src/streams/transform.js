import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const transform = async () => {
    const reversStr = (str) =>
        str.toString().split("")
            .reverse()
            .join("")

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, reversStr(chunk))
        }
    })

    try {
        await pipeline(
            process.stdin,
            transformStream,
            process.stdout);
    }
    catch (e) {
        console.log(e)
    }
};

await transform(); 