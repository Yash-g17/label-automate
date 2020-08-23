var socket = io.connect("http://localhost:5000");
socket.on("code", (data) => {
    console.log("code recieved" + data);
    //   document.querySelector("#text-2").innerHTML = data;
});