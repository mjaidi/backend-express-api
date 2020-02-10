"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "role",
          {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "client",
            allowNull: false
          },
          { transaction: t }
        )
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Users", "role", { transaction: t })
      ]);
    });
  }
};
