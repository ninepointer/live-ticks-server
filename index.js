const express = require("express");
const KiteTicker = require("kiteconnect").KiteTicker;
const Redis = require("ioredis");
require("dotenv").config();
const mongoose = require("mongoose");
const { fetchTokens } = require("./helper");

const app = express();
const port = 7001;

const {
  KITE_API_KEY,
  KITE_ACCESS_TOKEN,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

// Initialize Redis client for Pub/Sub
const redis =
  process.env.ENVIRONMENT == "dev"
    ? new Redis({
        port: REDIS_PORT,
        host: REDIS_HOST,
        retryStrategy: (times) => Math.min(times * 50, 2000),
      })
    : process.env.ENVIRONMENT == "staging"
    ? new Redis(
        `redis://stoxhero-staging-redis-001.zvfkqy.0001.aps1.cache.amazonaws.com`
      )
    : new Redis(
        `redis://stoxhero-redis.zvfkqy.ng.0001.aps1.cache.amazonaws.com`
      );

// Initialize Kite Ticker
const ticker = new KiteTicker({
  api_key: KITE_API_KEY,
  access_token: KITE_ACCESS_TOKEN,
});

const connectTicker = () => {
  ticker.connect();
  ticker.on("ticks", (ticks) => {
    // Publish ticks to Redis Pub/Sub channel
    try {
      console.log(ticks);
      redis.publish("kite_ticks_channel", JSON.stringify(ticks));
    } catch (e) {
      console.log(e);
    }
  });

  ticker.on("connect", () => {
    console.log("Connected to Kite Ticker");
    ticker.subscribe([256265]);
    ticker.setMode(ticker.modeFull, [256265]);
  });

  ticker.on("noreconnect", () => {
    console.log("No reconnection attempts left. Manual intervention required.");
  });

  ticker.on("reconnect", (attempt, delay) => {
    console.log(`Reconnecting: Attempt ${attempt} and after delay ${delay}ms`);
  });

  ticker.on("error", (err) => {
    console.error("Ticker Error:", err.message);
  });
};
const subscribeTokens = async () => {
  let tokens = await fetchTokens();
  ticker?.subscribe(tokens);
  ticker?.setMode(ticker?.modeQuote, tokens);
};
const DB = process.env.DATABASE;
const devDB = process.env.DEVDATABASE;
const stagingDB = process.env.STAGINGDB;
const infinityDB = process.env.INFINITYDB;
mongoose
  .connect(DB, {
    // mongoose.connect(stagingDB, {
    // mongoose.connect(infinityDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log("connection secure");
  })
  .catch((err) => {
    console.log(err);
    console.log("no connection");
  });

// Connect to Kite Ticker
connectTicker();

app.get("/", (req, res) => {
  res.send("Server is running and publishing ticks!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
