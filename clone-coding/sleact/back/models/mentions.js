const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Mention extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        content: {
          type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
      },
      {
        modelName: 'Mention',
        tableName: 'mentions',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Mention.belongsTo(db.Workspace);
    db.Mention.belongsTo(db.Sender, { as: 'SenderId' });
    db.Mention.belongsTo(db.Receiver, { as: 'ReceiverId' });
  }
};
