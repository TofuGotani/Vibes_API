import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
import configJson from "./config/config.json";

const config = configJson[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export { sequelize };
