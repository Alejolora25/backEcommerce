'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'id_category'
      })

      Product.hasMany(models.Image, {
        foreignKey: 'id_product'
      })
    }
  }
  Product.init({
    name_product: DataTypes.STRING,
    price_product: DataTypes.DECIMAL,
    quantity_product: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    isActive: DataTypes.BOOLEAN,
    id_category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};