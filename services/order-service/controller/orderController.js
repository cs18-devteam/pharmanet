exports.getOrder=(req , res) => {
    res.writeHead(200);
    res.write('Get Order');
    res.end();
}

exports.CreateOrder=(req, res) => {
    res.writeHead(200);
    res.write('Create Order');
    res.end();
}

exports.UpdateOrder=(req, res) => {
    res.writeHead(200);
    res.write('update Order');
    res.end();
}

exports.DeleteOrder=(req, res) => {
    res.writeHead(200);
    res.write('Delete Order');
    res.end();
}