const parseEnv = () => {
    const STR = 'RSS_'

    const envParams = process.env;
    Object
        .keys(envParams)
        .filter((key) => key.startsWith(STR))
        .forEach((key) => {
            console.log(`${key} = ${envParams[key]};`);
        })
};

parseEnv();