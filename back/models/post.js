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
    db.Post.hasMany(db.Comment); // post.addComments
    db.Post.hasMany(db.Image); // post.addImages
    db.Post.belongsTo(db.User); // post.addUser post.getUser post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'}); // 중간 db가 생기고 그 db에 PostId, HashtagId가 생성됨 post.addHashtag post.removeHashtag
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' }); // post.addLiker post.removeLiker 가 생김
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweet 생성
  };
  return Post;
};