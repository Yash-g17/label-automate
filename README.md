# label-automate

label automater for small businesses.
run the node application app.js,
This application=>
->tails the log file and reads new changes
->creates an api which sends new date and time as the response.
after running the node application open label.html,
This webpage=>
->uses qrcode-custom.js to send a GET req to fetch the current date and time and create its qr code using davids qr-code library
Use this to tail any file and generate qr-codes when necessary.
