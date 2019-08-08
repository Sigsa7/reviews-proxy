const newRelic = require('newrelic');
const app = require('./app');

const PORT = 3000;

module.exports = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
