const { catchAsync, apiCatchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const Transactions = require("../../models/TransactionModel");

exports.getTransactions = catchAsync( async (req , res)=>{

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


   
})


exports.createTransaction = apiCatchAsync( async (req , res)=>{
    await Transactions.query('start transaction');
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

  
})


