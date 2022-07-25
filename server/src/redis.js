// const { model } = require("mongoose");
const Redis = require("ioredis");

const client = new Redis({
  port: 6379,
  host: "cache",
});

module.exports = client;
