'use strict';

const faker = require("faker");

let products = [];

for(let i =1; i <20; i++){
  products.push({
    title: faker.hacker.noun(),
    description: faker.hacker.phrase(),
    price: 10,
    createdAt: new Date(),
    updatedAt: new Date
  });
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert("Products", products, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete("Products", null, {});
  }
};
