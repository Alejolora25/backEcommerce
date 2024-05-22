'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'id_user'
      });
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: 'id_order'
      });
    }
  }
  Order.init({
    id_user: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(10,2),
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    country: DataTypes.STRING,
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
