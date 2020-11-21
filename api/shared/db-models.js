const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

class Person extends Model {}
Person.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
  },
  { sequelize, modelName: "person" }
);
(async () => {
  await sequelize.sync();
  await Person.sync({ force: false, alter: true });
})();

module.exports = { Person };
