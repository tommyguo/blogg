module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: { type: DataTypes.STRING, unique: true },
    data: DataTypes.BLOB,
  });

  return Image;
};