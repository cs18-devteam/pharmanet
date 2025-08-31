const UserFactory = require("../models/UserFactory")


exports.createCustomer = async (req , res)=>{
    UserFactory.createUser('customer');
}

exports.getCustomer = async (req , res)=>{
}

exports.updateCustomer = async (req , res)=>{
}

exports.deleteCustomer = async (req , res)=>{
}


