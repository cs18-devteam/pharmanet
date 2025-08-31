const db = require('./../../../database/Database');


exports.createProduct = function createProduct(name, price, quantity) {
  const sql = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
  db.query(sql, [name, price, quantity], (err, result) => {
    if (err) throw err;
    console.log("Product created with ID:", result.insertId);
  });
}


exports.getProduct = function getProduct(productId = null) {
  let sql = 'SELECT * FROM products';
  let params = [];

  if (productId) {
    sql += ' WHERE id = ?';
    params.push(productId);
  }

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    console.log("Product Records:", results);
  });
}

 
exports.updateProduct = function updateProduct(id, name, price, quantity) {
  const sql = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
  db.query(sql, [name, price, quantity, id], (err, result) => {
    if (err) throw err;
    console.log("Updated" + result.affectedRows + "product(s)");
  });
}

exports.deleteattendance = function deleteProduct(id) {
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log("Deleted" + result.affectedRows + "product(s)");
  });
}

