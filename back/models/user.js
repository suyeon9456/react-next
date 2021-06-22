module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define({ // mssql에는 users로 생성됨
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8-general-ci'
  });
  User.associate = (db) => {};
  return User;
};