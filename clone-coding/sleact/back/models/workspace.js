const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Workspace extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        name: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
          unique: true,
        },
        url: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
          unique: true,
        },
      },
      {
        modelName: 'Workspace',
        tableName: 'workspaces',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Workpsace.belongsTo(db.User, { as: 'Owner', foreignKey: 'OwnerId' });
    db.Workpsace.belongsToMany(db.User, {
      through: db.WorkspaceMember,
      as: 'Members',
    });
    db.Workpsace.hasMany(db.Channel);
    db.Workpsace.hasMany(db.DM);
  }
};
