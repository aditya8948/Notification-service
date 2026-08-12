'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config', 'config.json');
const configFile = fs.existsSync(configPath) ? require(configPath) : {};
const config = configFile[env] || (
  process.env.DATABASE_URL
    ? {
        use_env_variable: 'DATABASE_URL',
        dialect: process.env.DB_DIALECT || 'mysql'
      }
    : {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'notification_db',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'mysql'
      }
);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
