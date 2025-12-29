const os = require('node:os');
const ipaddress = os.networkInterfaces()['Wi-Fi']?.filter(obj => obj.family == "IPv4")[0].address;
// console.log(os.networkInterfaces())

module.exports = ipaddress;







