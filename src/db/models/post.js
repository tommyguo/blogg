module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    // the complete URL for your banner image (can be realtive)
    banner: DataTypes.STRING,
    content: DataTypes.STRING(30000),
    // the URL slug to view the post (appended to /post)
    slug: {type: DataTypes.STRING, unique: true}
  });

  return Post;
};