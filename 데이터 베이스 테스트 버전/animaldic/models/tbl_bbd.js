import { Model } from "sequelize";

export default class tbl_bbd extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        num: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        author: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: "author",
        },
        title: {
          type: DataTypes.STRING(125),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        p_image_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        p_image_origin_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_bbd",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "num" }],
          },
          {
            name: "author",
            unique: true,
            using: "BTREE",
            fields: [{ name: "author" }],
          },
        ],
      }
    );
  }
}
