const os = require('node:os');
let ipaddress = os.networkInterfaces()["en0"]?.filter(obj => obj.family == "IPv4")[0].address;

if(!ipaddress) ipaddress = "localhost";
// console.log(os.networkInterfaces())


module.exports = ipaddress;







