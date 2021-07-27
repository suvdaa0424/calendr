'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.Appointment)
    }
  };
  Patient.init({
    name: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    covid: DataTypes.BOOLEAN,
    phone: DataTypes.STRING(15)
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};