const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Transactions = require("../model/TransactionModel");



exports.getTransactions =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('value')) filter.value = req.params.get('value')
    if(req.params.get('description')) filter.description = req.params.get('description')

    let content =  ''
    if(filter.id || filter.value || filter.description){
        content = await Transactions.get(filter);
    }else{
        content = await Transactions.get();
    }

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
    
}


exports.deleteTransaction =async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const results = await Transactions.deleteById(id);
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}


exports.updateTransaction = async (req , res)=>{
    const {name , value , description} = JSON.parse(await getRequestData(req));
    const results = await Transactions.update({
        name , value , description
    });
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createTransaction = async (req , res)=>{
    const {name , value , description} = JSON.parse(await getRequestData(req));
    const newTransaction = await Transactions.save({
        name , value , description
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newTransaction,
        count : newTransaction.length,
    });
}