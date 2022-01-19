import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

dotenv.config();

const ormconfig: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: false,
  entities: ["entities/**/*.ts"],
  migrations: ["migrations/**/*.ts"],
  subscribers: ["subscribers/**/*.ts"],
  cli: {
    entitiesDir: "entities",
    migrationsDir: "migrations",
    subscribersDir: "subscribers",
  },
};

export default ormconfig;
