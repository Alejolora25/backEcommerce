'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Asociación con User
      Cart.belongsTo(models.User, {
        foreignKey: 'id_user'
      });
    }
  }
  Cart.init({
    purchase_total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    quantity_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};