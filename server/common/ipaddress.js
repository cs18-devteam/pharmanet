const os = require('node:os');
const ipaddress = os.networkInterfaces()["en0"]?.filter(obj => obj.family == "IPv4")[0].address;


module.exports = ipaddress;







