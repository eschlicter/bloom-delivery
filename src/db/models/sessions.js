'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sessions = sequelize.define('Sessions', {
    sid: DataTypes.STRING,
    expire: DataTypes.DATE,
    data: DataTypes.BLOB,
    sess: DataTypes.JSON
  }, {});
  Sessions.associate = function(models) {
    // associations can be defined here
  };
  return Sessions;
};