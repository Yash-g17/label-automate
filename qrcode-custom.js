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
  console.log("inside httpGet ====> " + theUrl);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl); // false for synchronous request
  xmlHttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log("inside onreadtstatechange");
      a = xmlHttp.responseText;
      qrcode.clear(); // clear the code.
      qrcode.makeCode(a); // make another code.
      // a = xmlHttp.responseText;
      // return xmlHttp.responseText;
      // console.log("respomse ===> " + xmlHttp.responseText);
    } else {
      // return xmlHttp.responseText;
    }
  };
  xmlHttp.send();
  console.log("sending the req.");
  // return xmlHttp.responseText;
  // fetch("theUrl").then((response) => console.log(response.text()));
}
document.getElementById("button").addEventListener("click", () => {
  console.log("button clicked");

  httpGet("http://127.0.0.1:3000/api");
});
