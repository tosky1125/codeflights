'use strict';
const crypto = require('crypto');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (data, option) => {
        var sha256 = crypto.createHmac('sha256', 'thisismysecretkey');
        sha256.update(data.password);
        data.password = sha256.digest('hex');
      },
      beforeFind: (data, option) => {
        if (data.where.password) {
          var sha256 = crypto.createHmac('sha256', 'thisismysecretkey');
          sha256.update(data.where.password);
          data.where.password = sha256.digest('hex');
        }
      },
      beforeBulkUpdate : (data, option) => {
        console.log(data);
        var sha256 = crypto.createHmac('sha256', 'thisismysecretkey');
        sha256.update(data.attributes.password);
        data.attributes.password = sha256.digest('hex');
      }
    },
    sequelize,
    modelName: 'users',
  });
  return users;
};
