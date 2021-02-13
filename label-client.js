// var srno;
let qrcode1 = new QRCode("output1", {
    text: "5",
    width: 50,
    height: 50,
    colorDark: "#000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
});
let qrcode2 = new QRCode("output2", {
    text: "5",
    width: 50,
    height: 50,
    colorDark: "#000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
});
var socket = io.connect("http://localhost:5000"); {
    socket.on("weight", (data) => {
        console.log("weight recieved" + data);
        if (data != null) {
            document.querySelector("#text-1").value = data;
        }
        if (document.querySelector("#text-2").value != null) {
            document.getElementById("print-button").click();
            document.getElementById("print-button").click();
        }
    });
    socket.on("code", (data) => {
        console.log("code recieved" + data);
        document.getElementById("text-2").value = data;
        if (document.querySelector("#text-1").value != null) {
            document.getElementById("print-button").click();
            document.getElementById("print-button").click();
        }
    });
}
socket.on("connect", () => {
    document.getElementById("generate-button").addEventListener("click", () => {
        document.querySelector("#weight").innerHTML = document.getElementById(
            "text-1"
        ).value;

        let str = `{ 
              "weight" : "${document.getElementById("text-1").value}",
              "product_type" : "${document.getElementById("text-2").value}"
        }`;
        console.log(str);
        qrcode1.clear(); // clear the code.
        qrcode1.makeCode(document.getElementById("text-1").value); // make another code.
        dataJson = JSON.parse(str);
        console.log("Generate command sent");
        socket.emit("generate");
    });
});

const httpPost = (theUrl) => {
    const weight = document.querySelector("#text-1");
    const product_id = document.querySelector("#text-2");
    const weight_string = String(weight.value);
    const product_id_string = String(product_id.value);
    let data = {
        productid: product_id_string,
        weight: weight_string,
    };
    product_id.value = "";
    weight.value = "";
    console.log("data =========== " + JSON.stringify(data));
    return fetch(theUrl, {
        headers: {
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });
};

document.getElementById("print-button").addEventListener("click", () => {
    let srno = httpPost("http://127.0.0.1:5000/insert");
    srno
        .then((Response) => Response.text())
        .then((data) => {
            document.querySelector("#srno").innerHTML = data;
            qrcode2.clear();
            qrcode2.makeCode(data);
            setTimeout(() => {
                var printContents = document.getElementById("printable").innerHTML;
                var originalContents = document.body.innerHTML;
                document.body.innerHTML = printContents;
                window.print();
                document.body.innerHTML = originalContents;
            }, 50);
        });
});