Tail = require("tail").Tail;
const express = require("express");
const app = express();
tail = new Tail("./log");
let a;
tail.on("line", function (data) {
  a = data;
  console.log(data);
});

tail.on("error", function (error) {
  console.log("ERROR: ", error);
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
app.get("/api", (req, res) => {
  console.log("output ==========>" + a);
  res.send(a);
});
const port = 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
