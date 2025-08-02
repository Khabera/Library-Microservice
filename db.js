const { MongoClient } = require('mongodb');

const uri = process.env.DB_CONNECTION_URI
console.log(process.env.DB_NAME)
const client = new MongoClient(uri, {
  minPoolSize: 10,
  maxPoolSize: 40,
  waitQueueTimeoutMS: 4000
});

module.exports = client;
