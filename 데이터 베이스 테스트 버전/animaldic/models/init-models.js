// import _sequelize from "sequelize";
// const DataTypes = _sequelize.DataTypes;
// import _tbl_bbd from "./tbl_bbd.js";

// export default function initModels(sequelize) {
//   const tbl_bbd = _tbl_bbd.init(sequelize, DataTypes);

//   return {
//     tbl_bbd,
//   };
// }

import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_bbd from "./tbl_bbd.js";
import _tbl_members from "./tbl_members.js";

export default function initModels(sequelize) {
  const tbl_bbd = _tbl_bbd.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);

  tbl_members.belongsTo(tbl_bbd, { as: "m_username_tbl_bbd", foreignKey: "m_username" });
  tbl_bbd.hasOne(tbl_members, { as: "tbl_member", foreignKey: "m_username" });

  return {
    tbl_bbd,
    tbl_members,
  };
}
