'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permisstion_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permisstion_Role.init({
    permission_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Permisstion_Role',
    freezeTableName:true
  });
  return Permisstion_Role;
};