const app = require('./app');

const PORT = 80;

module.exports = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
