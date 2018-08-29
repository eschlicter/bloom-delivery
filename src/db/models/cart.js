'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    total: DataTypes.INTEGER,
    products: DataTypes.JSON
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};