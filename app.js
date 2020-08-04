Tail = require("tail").Tail;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const dbService = require("./dbService");
dotenv.config();

tail = new Tail("./log");
let a;
tail.on("line", function(data) {
    a = data;
    console.log(data);
});

tail.on("error", function(error) {
    console.log("ERROR: ", error);
});

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    console.log("output ==========>" + a);
    res.send(a);
});

app.get("/getall", (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then((data) =>
            res.json({
                data: data,
            })
        )
        .catch((err) => console.log(err));
    // res.json({
    //   success: true,
    // });
});

app.post("/insert", (request, response) => {
    const { name } = request.body;
    console.log("insert -> " + name);

    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
        .then((data) => response.json({ data: data }))
        .catch((err) => console.log(err));
});

// const port = 3000;
app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});