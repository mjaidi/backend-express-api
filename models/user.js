const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const sequelize = require("../mysqlConnection");

// setup User model and its fields.
const User = sequelize.define(
  "users",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 25]
      }
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: "client",
      validate: {
        isIn: [["client", "supplier", "admin"]]
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },
  {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  }
);
User.prototype.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create all the defined tables in the specified database.
// tables are created through the migration files

// export User model for use in other files.
module.exports = User;
