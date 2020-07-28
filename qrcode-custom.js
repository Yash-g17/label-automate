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
  xmlHttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      a = xmlHttp.responseText;
      qrcode.clear(); // clear the code.
      qrcode.makeCode(a); // make another code.
      document.getElementById("content").innerHTML = a;
    }
  };
  xmlHttp.send();
  // return xmlHttp.responseText;
  // fetch("theUrl").then((response) => console.log(response.text()));
}
document.getElementById("button").addEventListener("click", () => {
  httpGet("http://127.0.0.1:3000/api");
});
