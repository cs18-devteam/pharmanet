const TransactionModel = require("../models/TransactionModel");


const Transactions = new TransactionModel();
Transactions.createTable();

exports.createTransaction = async (req , res)=>{
    const newTransaction =await Transactions.save();

    res.writeHead()
    res.write(JSON.parse(newTransaction));
    req.end();
}

exports.updateTransaction = async (req , res)=>{
    Transactions.update();
}

exports.getTransaction = async (req , res)=>{
    Transactions.getById();
}

exports.deleteTransaction = async (req , res)=>{
    Transactions.deleteById();
}