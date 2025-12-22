const os = require('node:os');
const ipaddress = os.networkInterfaces()["Ethernet 2"]?.filter(obj => obj.family == "IPv4")[0].address;
console.log(os.networkInterfaces())


module.exports = ipaddress;







