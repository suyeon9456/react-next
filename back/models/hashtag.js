module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define({ // mssql에는 hashtags로 생성됨
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4-general-ci'
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post); // 중간 db가 생기고 그 db에 PostId, HashtagId가 생성됨
  };
  return Hashtag;
};