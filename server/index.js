"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const PORT = process.env.PORT || 8080;

const app = express();
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
// Content Security Policy (CSP)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
// https://helmetjs.github.io/
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'developement') {
  app.use("/", express.static(__dirname + "/"));
}

// app.get("/bacon", (req, res) => res.status(200).json("🥓"));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
