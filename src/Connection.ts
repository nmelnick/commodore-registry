import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from "typeorm";
import { config } from "./Config";

export async function generateConnection(): Promise<Connection> {
  return createConnection(await generateConnectionOptions());
}

export async function generateConnectionOptions(): Promise<ConnectionOptions> {
  return Object.assign(
    await getConnectionOptions(),
    {
        host: config.pg.host,
        username: config.pg.username,
        password: config.pg.password,
        database: config.pg.database
    }
  );
}
