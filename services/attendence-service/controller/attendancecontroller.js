// exports.getattendance = (req,respond) => {
//     respond.writeHead(200);
//     respond.write('Hi Get attendance');
//     respond.end();

// }

const db = require('./../../../database/Database');

//mark attendance
exports.getattendance = function markAttendance(userId, date, status) {
  const sql = 'INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)';
  db.query(sql, [userId, date, status], (err, result) => {
    if (err) throw err;
    console.log("Attendance marked with ID:",result.insertId);
  });
}


exports.createattendance = function getAttendance(userId = null) {
  let sql = 'SELECT * FROM attendance';
  let params = [];

  if (userId) {
    sql += ' WHERE user_id = ?';
    params.push(userId);
  }

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    console.log("Attendance Records:", results);
  });
}
 
exports.updateattendance = function updateAttendance(id, status) {
  const sql = 'UPDATE attendance SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) throw err;
    console.log("Updated" + result.affectedRows + "attendance record(s)");
  });
}

exports.deleteattendance = function deleteAttendance(id) {
  const sql = 'DELETE FROM attendance WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log("Deleted" + result.affectedRows + "attendance record(s)");
  });
}


