const userSeeder = require("./seeders/userSeeder");
const propertySeeder = require("./seeders/propertySeeder");

(async () => {
  await userSeeder();
  await propertySeeder();
})();
