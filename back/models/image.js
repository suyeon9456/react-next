module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define({ // mssql에는 images로 생성됨
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8-general-ci'
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};