const os = require('node:os');
const ipaddress = os.networkInterfaces().en0.slice(-1).address;


module.exports = ipaddress;







