'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.Product, {
        foreignKey: 'id_product'
      });
      OrderProduct.belongsTo(models.Order, {
        foreignKey: 'id_order'
      });
    }
  }
  OrderProduct.init({
    id_order: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id'
      },
    },
    id_product: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
    },
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};