const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const Transactions = require("../../models/TransactionModel");

exports.getTransactions = async (req , res)=>{
    try{
        const filter = {}
        const pharmacyId = req.params.get("pharmacyId");
        const userId = req.params.get("userId");
        const staffID = req.params.get('staffId');
        const orderId = req.params.get('orderId');


        if(pharmacyId){
            filter.pharmacyId = pharmacyId;
        }

        if(userId){
            filter.userId = userId;
        }

        if(staffID){
            filter.staffID = staffID;
        }

        if(orderId){
            filter.orderId = orderId;
        }

        let transactions = {};
        if(Object.keys(filter).length == 0){
            transactions = await Transactions.get()
        }else{
            transactions = await Transactions.get(filter);
        }
        

        return responseJson(res , 200 , {
            status:"success",
            results:transactions,
            count: transactions.length,
        });


    }catch(e){
        console.log(e);
        return responseJson(res , 400 , {
            status:"error",
            message:"something wrong",
            error:e,
        })
    }
}


exports.createTransaction = async (req , res)=>{
    await Transactions.query('start transaction');
    try{
        const reqData = JSON.parse(await getRequestData(req));
        const transactionObj = {
            orderId : reqData.orderId,
            pharmacyId : reqData.pharmacyId,
            amount : reqData.amount,
            userId : reqData.userId,
            type : reqData.type,
            staffID : reqData.staffID , 
            method : reqData.method,
            transactionDateTime : reqData.datetime,
        }

        const newTransaction = await Transactions.save(transactionObj);

        return responseJson(res , 200 , {
            status:"success",
            results : newTransaction,
        })

    }catch(e){
        console.log(e);
        await Transactions.query('rollback');
        return responseJson(res , 200 , {
            status :"error",
            message:"Transaction not created",
            error:e,
        })
    }
}


