const parseArgs = () => {
    const args = process.argv;
    let ind = 0;
    while (ind < args.length) {
        if (String(args[ind]).startsWith('--')) {
            console.log(`${args[ind]} is ${args[ind + 1]}`);
            ind++;
        }
        ind++;
    }
};

parseArgs();