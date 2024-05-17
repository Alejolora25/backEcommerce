'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'id_role'
      })
    }
  }
  User.init({
    name_user: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    id_role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};