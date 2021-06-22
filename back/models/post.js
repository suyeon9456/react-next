module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // mssql에는 posts로 생성됨
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
    // UserId, RetweetId 생성됨
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });
  Post.associate = (db) => {
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'}); // 중간 db가 생기고 그 db에 PostId, HashtagId가 생성됨
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
};