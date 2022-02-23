import { ConnectionOptions } from "typeorm";
import fs from "fs";
 
const localConfig = JSON.parse(fs.readFileSync("config.json").toString()).pg;
const config: ConnectionOptions = {
    ...JSON.parse(fs.readFileSync("ormconfig.json").toString()),
    host: localConfig.host,
    username: localConfig.username,
    password: localConfig.password,
    database: localConfig.database
};

export = config;
