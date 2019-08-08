'use strict';

const faker = require('faker');

const generateGetRequestData = (userContext, events, done) => {
  const sortOptions = ['highest rating', 'lowest rating', ''];
  const keywords = [];
  const restaurantId = Math.floor(Math.random() * 10000001);
  const sort = sortOptions[Math.floor(Math.random() * 3)];
  const star = Math.floor(Math.random() * 6);

  let randomKeywordCount = Math.floor(Math.random() * 4);

  while (randomKeywordCount > 0) {
    keywords.push(faker.lorem.word());
    randomKeywordCount --;
  }

  userContext.vars.restaurantId = restaurantId;
  userContext.vars.keywords = keywords;
  userContext.vars.sort = sort;
  userContext.vars.star = star;

  return done();

}

module.exports = {
  generateGetRequestData,
};
