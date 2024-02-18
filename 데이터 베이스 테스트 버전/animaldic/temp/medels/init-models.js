import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_bbd from  "./tbl_bbd.js";
import _tbl_members from  "./tbl_members.js";

export default function initModels(sequelize) {
  const tbl_bbd = _tbl_bbd.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);


  return {
    tbl_bbd,
    tbl_members,
  };
}
