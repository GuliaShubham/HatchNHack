// import { getOrder } from "./index.js";
const f = require("./index");
const { env } = process;

// External Libraries
const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
// const bodyParse = require("body-parser");

const app = express();
app.use(express.json());

// app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
// Set Port
const port = env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.post("/order", function (req, res) {
  f.getOrder(req, res);
  //   console.log(req.body);
  //   res.send(req.body);
});

app.get("/view/:id", function (req, res) {
  const { id } = req.params;

  f.viewVendor(req, res, id);
});

app.post("/commit/:id", function (req, res) {
  const { id } = req.params;

  f.commitOrder(req, res, id);
});

app.use((err, req, res, next) => {
  res.status(err.code || 500);
  res.json({
    status: "error",
    msg: err.message || "An unknown error occurred!",
  });
});
