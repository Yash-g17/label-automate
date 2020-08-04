// import { response } from "express/lib/express";

let qrcode = new QRCode("output", {
    text: "5",
    width: 177,
    height: 177,
    colorDark: "#000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
});

let a;

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl); // false for synchronous request
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            a = xmlHttp.responseText;
            qrcode.clear(); // clear the code.
            qrcode.makeCode(a); // make another code.
            document.getElementById("content").innerHTML = a;
        }
    };
    xmlHttp.send();
}

document.getElementById("print-button").addEventListener("click", () => {
    httpPost("http://127.0.0.1:5000/insert");
});

function httpPost(theUrl) {
    const nameInput = document.querySelector("#text-1");
    const name = String(nameInput.value);
    console.log(name);
    let data = {
        name: name,
    };
    nameInput.value = "";
    console.log("data =========== " + JSON.stringify(data));

    fetch("http://localhost:5000/insert", {
        headers: {
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    }).then((response) => console.log(response));
}
document.getElementById("generate-button").addEventListener("click", () => {
    httpGet("http://127.0.0.1:5000/api");
});