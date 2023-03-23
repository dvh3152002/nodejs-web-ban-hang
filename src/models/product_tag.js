'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Tag.init({
    product_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product_Tag',
  });
  return Product_Tag;
};