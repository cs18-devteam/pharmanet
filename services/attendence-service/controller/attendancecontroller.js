exports.getattendance = (req,respond) => {
    respond.writeHead(200);
    respond.write('Hi Get attendance');
    respond.end();

}

exports.createattendance = (req,respond) => {
    respond.writeHead(200);
    respond.write('Hi Create attendance');
    respond.end();


}

exports.updateattendance = (req,respond) => {
    respond.writeHead(200);
    respond.write('Hi Update attendance');
    respond.end();


}

exports.deleteattendance = (req,respond) => {
    respond.writeHead(200);
    respond.write('Hi Delete attendance');
    respond.end();


}
