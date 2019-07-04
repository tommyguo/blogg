require('dotenv').config();
const Sequelize = require('sequelize');

function getModels() {
  const models = {};

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  });

  const modules = [
    require('./post.js'),
    require('./image.js'),
  ];

  modules.forEach(module => {
    const model = module(sequelize, Sequelize);
    models[model.name] = model;
  });

  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  sequelize.sync();

  return models;
}

module.exports = getModels;