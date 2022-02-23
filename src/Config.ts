import * as fs from "fs";
import * as path from "path";

export class Config {
  public port: number;
  public pg: PgConfig;

  constructor() {
    let rawJson = "{}";
    if (process.env.CONFIG) {
      rawJson = process.env.CONFIG;
    } else {
      const configFile = path.join(process.cwd(), "config.json");
      rawJson = fs.readFileSync(configFile, "utf8");
    }
    Object.assign(this, JSON.parse(rawJson));
  }
}

export const config: Config = new Config();

export interface PgConfig {
  host: string;
  username: string;
  password: string;
  database: string;
}
