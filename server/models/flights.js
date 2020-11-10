'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  flights.init({
    portName: DataTypes.STRING,
    portCode: DataTypes.STRING,
    airName: DataTypes.STRING,
    airID: DataTypes.STRING,
    estTime: DataTypes.STRING,
    schTime: DataTypes.STRING,
    logo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'flights',
  });
  return flights;
};