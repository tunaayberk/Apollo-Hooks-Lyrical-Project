const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const historyFallback = require("connect-history-api-fallback");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();

// Replace with your mongoLab URI
const MONGO_URI =
  "mongodb+srv://tuna:tuna@graphql-bfbuc.mongodb.net/graphql?retryWrites=true&w=majority";
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
const bundle = webpack(webpackConfig);

const hotMiddleware = [
  webpackMiddleware(bundle, {
    filename: webpackConfig.output.filename,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }),
  webpackHotMiddleware(bundle, {
    log: console.log // eslint-disable-line no-console
  })
];

app.use(hotMiddleware);

module.exports = app;
