const dotenv = require('dotenv');

// setting up the dotenv config
dotenv.config({
  path: './.env'
});

const dbPass = process.env.DB_PASS;

module.exports = {
  mongoURI: `mongodb://admin:${dbPass}@dev-connector-shard-00-00-hcjaz.mongodb.net:27017,dev-connector-shard-00-01-hcjaz.mongodb.net:27017,dev-connector-shard-00-02-hcjaz.mongodb.net:27017/test?ssl=true&replicaSet=dev-connector-shard-0&authSource=admin&retryWrites=true`
}