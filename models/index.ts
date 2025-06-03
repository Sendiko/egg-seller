import { Sequelize } from "sequelize";

import config from "../config/config";

const db = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "mysql",
  }
);

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err: any) => console.log("Error: " + err));

export default db;
