// import os from "os";
// import { execSync } from "child_process";

// const DOMAIN = "myapp.local";

// // function getLocalIP() {
// //   const nets = os.networkInterfaces();
// //   for (const name of Object.keys(nets)) {
// //     for (const net of nets[name]) {
// //       if (net.family === "IPv4" && !net.internal) {
// //         return net.address;
// //       }
// //     }
// //   }
// //   return null;
// // }

// // const ip = getLocalIP();
// // if (!ip) {
// //   console.error("❌ Could not detect local IP");
// //   process.exit(1);
// // }

// execSync(`hostile set ${ip} ${DOMAIN}`, { stdio: "inherit" });
// console.log(`✅ ${DOMAIN} → ${ip}`);
