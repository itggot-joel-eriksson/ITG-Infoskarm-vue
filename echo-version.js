const package = require("./package.json");

const output = { latest: package.version }

console.log(JSON.stringify(output));
