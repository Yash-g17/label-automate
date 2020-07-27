const readLastLines = require("read-last-lines");
readLastLines.read("path/to/file", 1).then((lines) => console.log(lines));
