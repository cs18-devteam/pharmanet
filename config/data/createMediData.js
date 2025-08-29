const CSV = require("../../common/CSVAdapter");
const path = require("path");
const filepath = path.join(__dirname  , "./medicines.csv" );

const medicines = new CSV(filepath);
console.table(medicines.get());