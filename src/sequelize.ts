import { Sequelize } from "sequelize-typescript";
const { DB_HOST, DB_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

export const sequelize = new Sequelize({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: "mysql",
  sync: { force: false },
  models: [__dirname + "/models/**"],
});
