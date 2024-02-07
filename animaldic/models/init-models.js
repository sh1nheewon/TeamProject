import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_bbd from "./tbl_bbd.js";

export default function initModels(sequelize) {
  const tbl_bbd = _tbl_bbd.init(sequelize, DataTypes);

  return {
    tbl_bbd,
  };
}
