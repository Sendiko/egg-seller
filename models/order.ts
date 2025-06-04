import db from ".";
import { DataTypes } from "sequelize";

const Order = db.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchaseType: {
    type: DataTypes.ENUM("Grosir", "Eceran"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eggImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Order.sync({ alter: true })
  .then(() => console.log("Orders table synced"))
  .catch((err: any) => console.error("Error syncing Orders table:", err));

export default Order;
