'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Asociación con Role
      User.belongsTo(models.Role, {
        foreignKey: 'id_role'
      });

      // Asociación uno a uno con Cart
      User.hasOne(models.Cart, {
        foreignKey: 'id_user'
      });
      User.hasMany(models.Order, {
        foreignKey: 'id_user'
      });
    }
  }
  User.init({
    name_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    id_role: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      references: {
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
