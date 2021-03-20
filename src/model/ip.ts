import { DataTypes, UUIDV4 } from "sequelize";

import { sequelize } from "../sequelize";

const IP = sequelize.define("IPs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  access_count: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0,
  },
  last_access_time: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: Math.floor(Date.now()),
  },
});

export { IP };
