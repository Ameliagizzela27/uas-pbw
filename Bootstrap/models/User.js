const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "user",
  {
    nama: { type: Sequelize.STRING },
    tanggalkunjungan: { type: Sequelize.STRING }
  },
  {
    freezeTableName: true
  }
);

module.exports = User;
