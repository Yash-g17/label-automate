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
const port1 = new SerialPort("COM4", {
    baudRate: 9600,
});
const port2 = new SerialPort("COM3", {
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
        port1.on("data", function(data) {
            socket.broadcast.emit("weight", data.toString("utf8"));
            console.log("Data2:", data.toString("utf8"));
        });
        port2.on("data", function(data) {
            socket.broadcast.emit("code", data.toString("utf8"));
            console.log("Data1:", data.toString("utf8"));
        });
        // socket.broadcast.emit("code", data);
        socket.on("generate", () => {
            console.log("Generate command recieved");
        });
    });
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
    const { weight } = request.body;
    const { productid } = request.body;
    console.log("insert -> " + weight + " " + productid);

    const db = dbService.getDbServiceInstance();

    const result = db.insertNewProduct(productid, weight);

    result
        .then((data) => {
            console.log(data);
            response.json(data);
        })
        .catch((err) => console.log("error" + err));
});