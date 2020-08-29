let qrcode = new QRCode("output", {
    text: "5",
    width: 177,
    height: 177,
    colorDark: "#000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
});

var socket = io.connect("http://localhost:5000"); {
    socket.on("weight", (data) => {
        console.log("weight recieved" + data);
        if (data != null) {
            document.querySelector("#text-1").innerHTML = data;
        }
    });
    socket.on("code", (data) => {
        console.log("code recieved" + data);
        document.querySelector("#text-2").innerHTML = data;
    });
}
socket.on("connect", () => {
    document.getElementById("generate-button").addEventListener("click", () => {
        // let d = document.querySelector("#weight").nodeValue;
        console.log(document.getElementById("text-1").textContent);

        let str = `{ 
              weight : ${document.getElementById("text-1").textContent}},
              product-type :${document.getElementById("text-2").textContent}
              `;
        qrcode.clear(); // clear the code.
        qrcode.makeCode(str); // make another code.

        console.log("Generate command sent");

        socket.emit("generate");
    });
});

function httpPost(theUrl) {
    const weight = document.querySelector("#text-1");
    const product_id = document.querySelector("#text-2");
    const weight_string = String(weight.value);
    const product_id_string = String(product_id.value);
    // console.log(name);
    let data = {
        productid: product_id_string,
        weight: weight_string,
    };
    product_id.value = "";
    weight.value = "";
    console.log("data =========== " + JSON.stringify(data));

    fetch(theUrl, {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
        .then((response) => response.text())
        .then((data) => console.log(data));
}

document.getElementById("print-button").addEventListener("click", () => {
    httpPost("http://127.0.0.1:5000/insert");
});

// function httpGet(theUrl) {
//     let a;
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("GET", theUrl);
//     xmlHttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             a = xmlHttp.responseText;
//             let str = a + "\n" + document.getElementById("weight").value;
//             qrcode.clear(); // clear the code.
//             qrcode.makeCode(str); // make another code.
//             document.getElementById("content").innerHTML = str;
//         }
//     };
//     xmlHttp.send();
// }

// document.getElementById("generate-button").addEventListener("click", () => {
//     httpGet("http://127.0.0.1:5000/api");
// });