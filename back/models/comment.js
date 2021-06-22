module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define({ // mssql에는 comments로 생성됨
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
    // PostId, UserId 생성됨
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4-general-ci'
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsTo(db.User);
  };
  return Comment;
};