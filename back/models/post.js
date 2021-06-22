module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define({ // mssql에는 posts로 생성됨
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4-general-ci'
  });
  Post.associate = (db) => {};
  return Post;
};