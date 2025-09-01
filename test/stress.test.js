// benchmark.js
const autocannon = require('autocannon');


autocannon(
    {
        url: "http://localhost:8080",
        connections: 100, // number of concurrent connections
        duration: 5, // test duration in seconds
    },
    (err, result) => {
        if (err) throw err;
        console.log("Benchmark Results:");
        console.log(result);
    }
);
