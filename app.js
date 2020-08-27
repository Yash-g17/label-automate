Tail = require("tail").Tail;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const dbService = require("./dbService");
const socket = require("socket.io");

let server = app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
});

const io = socket(server);
io.set("origins", "*:*");
dotenv.config();
app.use(cors());
app.use(express.json());

const SerialPort = require("serialport");
const port = new SerialPort("COM3", {
    baudRate: 9600,
});
// serialPort.on("open", function() {
//     console.log("open");
//     serialPort.on("data", function(data) {
//         console.log(data);
//     });
// });
/////////////////////////////////////////////////////////////////
//taking data from weight file and sending to browser when needed
{
    io.sockets.on("connection", (socket) => {
        console.log("Socket connection established    " + socket.id);
        // Switches the port into "flowing mode"
        port.on("data", function(data) {
            socket.broadcast.emit("weight", data.toString("utf8"));
            console.log("Data2:", data.toString("utf8"));
        });
        // socket.broadcast.emit("code", data);
        socket.on("generate", () => {
            console.log("Generate command recieved");
        });
    });
    // io.sockets.on("connection", (socket) => {
    //     console.log("connection established for id");

    //     socket.broadcast.emit("id", "hello world");
    // });
    //Takes weight from tail and sends to the browser
    // app.get("/api", (req, res) => {
    //     // a = TailFile("./log");
    //     console.log("output ==========>" + a);
    //     res.send(a);
    // });
}
////////////////////////////////////////////////////////////////////

// app.get("/getall", (req, res) => {
//     const db = dbService.getDbServiceInstance();
//     const result = db.getAllData();
//     result
//         .then((data) =>
//             res.json({
//                 data: data,
//             })
//         )
//         .catch((err) => console.log(err));
//     // res.json({
//     //   success: true,
//     // });
// });

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