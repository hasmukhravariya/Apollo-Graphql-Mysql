var DataTypes = require("sequelize").DataTypes;
var _task = require("./task");
var _users = require("./users");

function initModels(sequelize) {
  var task = _task(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    task,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
