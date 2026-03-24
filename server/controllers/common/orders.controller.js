const {apiCatchAsync} = require("../../common/catchAsync");
const Convert = require("../../common/Convert");
const getMultipartData = require("../../common/getMultipartData");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Carts = require("../../models/CartModel");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const PharmacyOrdersItems = require("../../models/PharmacyOrderItemsModel");
const PharmacyOrders = require("../../models/PharmacyOrderModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Products = require("../../models/ProductModel");
const Transactions = require("../../models/TransactionModel");
const Users = require("../../models/UserModel");


exports.createOrder = apiCatchAsync(async (req , res)=>{

        const reqData = JSON.parse(await getRequestData(req));
        const carts = reqData.carts;
        const items = reqData.items;
        const pharmacyId = reqData.pharmacyId;
        let ordersData  = [];


        
        const [order] =await  PharmacyOrders.save({
            userId : reqData.userId,
            pharmacyId : pharmacyId,
            createdAt : Convert.toSqlDate(Date.now()),
        })

        if(carts && carts.length){
            let cartsData = carts.map(async cid=>{
                return await Carts.get({
                    userId: reqData.userId,
                    id : cid,
                })
            });

            ordersData = await Promise.all(cartsData).then(data=>data.map(d=>d[0]));
        }

        const orders= await Promise.all(items.map(async (item)=>{


            let orderItem;
            if(item.itemType == "medicine"){
                [orderItem] = await PharmacyMedicines.get({
                    pharmacyId : pharmacyId,
                    medicineId : item.itemId
                });

                console.log(orderItem , {
                    pharmacyId : pharmacyId,
                    medicineId : item.itemId
                });

                if(orderItem.publicStock < item.quantity){
                    throw new Error(`insufficient medicine stock`);
                }

                console.log({
                    id: orderItem.id,
                    publicStock : orderItem.publicStock - item.quantity,
                    stock : orderItem.stock - item.quantity,
                });

                await PharmacyMedicines.update({
                    id: orderItem.id,
                    publicStock : orderItem.publicStock - item.quantity,
                    stock : orderItem.stock - item.quantity,
                })
            }else{
                orderItem = (await Products.getById(item.itemId))[0];

                if(orderItem.publicStock < item.quantity){
                    throw new Error(`insufficient product stock`);
                }

                await Products.update({
                    quantity: orderItem.quantity - item.quantity,
                })
            }


            




            return await PharmacyOrdersItems.save({
                orderId: order.id,
                itemId : item.itemId,
                itemType : item.itemType == "product" ? "product" : "medicine",
                quantity : item.quantity,
                price: orderItem?.price,
                discount: item.discount || "0.0" ,
            })
        }))

        let staff;
        if(reqData.staffId){
            const [staff] =  await PharmacyStaff.getById(reqData.staffId);

            if(!staff) throw new Error("staff member not found");
        }

        const [user] = await Users.getById(reqData.userId);
        if(!user){
            throw new Error("You not part of our system");
        }

        const [transaction] = await Transactions.save({
            orderId : order.id,
            staffID : reqData.staffId,
            pharmacyId : staff?.pharmacyId , 
            method: reqData.method,
            amount: reqData.amount ,
            userId : reqData.userId,
            type: reqData.type,
            transactionDateTime : Convert.toSqlDate(Date.now()),
            

        })

        return responseJson(res , 201 , {
            status:"success",
            results: {
                orderId : order.id , 
                pharmacyId : order.pharmacyId,
                items: orders,
                userId : order.userId,
                transaction : transaction,
            }
        })
})


exports.getOrders = apiCatchAsync(async (req , res)=>{
    const userId = req.params.get('user');
    const pharmacyId = req.params.get('pharmacy')    
    const id = req.params.get('id');
        
    const filter = {};
    if(userId) filter.userId = userId;
    if(pharmacyId) filter.pharmacyId = pharmacyId;
    if(id) filter.id = id;

    if(!Object.entries(filter).length) throw new Error('pharmacy | userId | id are not defined');

    const results = await PharmacyOrders.get(filter);

    let orders = results.map(async (order)=>{
        let items = await PharmacyOrdersItems.get({
            orderId :order.id,
        });

        items = await Promise.all(items.map(async i=>{
            if(i.itemType == "medicine"){
                const [medicine] = await Medicines.getById(i.itemId);
                return {
                    ...i,
                    name : medicine.geneticName,
                }
            }
            return {...i};
        } ))


        return {
            ...order,
            items,
            total: items.reduce((acc , item , i)=>{
                return acc + item.price * item.quantity  - item.discount;
            } , 0)
        }

    })

    orders = await Promise.all(orders);


    return responseJson(res , 200 , {
        status:"success",
        results : orders,
        count: results.length,
    })

});


exports.addOrderItem = apiCatchAsync(async (req , res)=>{
    const id = req.orderId;
    const reqData = JSON.parse(await getRequestData(req));

    let medicine;
    let product;
    if(reqData.medicineId){
        medicine = await Medicines.getById(reqData.medicineId)[0];
    }

    const orderObj = {
        orderId : id,
        itemId : reqData.medicineId || reqData.orderId,
        itemType : reqData.medicineId ? "medicine" : "product",      
        price : medicine?.price || product?.price,
        discount :  reqData.discount,
        quantity : reqData.quantity,
    }


 
    const [orderItem] = await PharmacyOrdersItems.save(orderObj)
    

    return responseJson(res , 200 , {
        status:"success",
        results : orderItem,
    } )
    
});



exports.getOrderItems =apiCatchAsync(async (req , res)=>{
    const id = req.orderId;
    const [order] = await PharmacyOrders.getById(id);
    let items = await PharmacyOrdersItems.get({
        orderId :id,
    })

    items = items.map(async i=>{
        if(i.itemType == "medicine"){
            return {
                ...i , 
                details : (await Medicines.getById(i.itemId))[0],
                stock : (await PharmacyMedicines.get({
                    medicineId : i.itemId,
                    pharmacyId : req.params.get("pharmacyId"),
                }))[0],
            }
        }else if(i.itemType == "product"){
            return {
                ...i , 
                details: (await Products.getById(i.itemId))[0],
            }
        }
    }) 

    items = await Promise.all(items);


    responseJson(res , 200 , {
        status:"success",
        results : {
            order , 
            items ,
        },
        count: 1,
    })
})



exports.deleteOrder = apiCatchAsync(async (req , res)=>{
    const id = req.orderId;
    let items = await PharmacyOrdersItems.get({
        orderId :id,
    })



    items = await Promise.all(items.map(async i=>{
        if(i.itemType == "medicine"){
            const [med] = await PharmacyMedicines.getById(i.itemId);
            console.log(med , med.publicStock + i.quantity);

            await PharmacyMedicines.update({
                id: i.itemId,
                publicStock : med.publicStock + i.quantity,
                stock : med.stock + i.quantity,
            })

            
        }else if(i.itemType == "product"){
            const [prod] = await Products.getById(i.itemId);
            
            if(prod){   
                await Products.update({
                    id: i.itemId,
                    quantity : prod.quantity + i.quantity,
                })
            }else{
                throw new Error("cannot find products");
            }
        }

        return  await PharmacyOrdersItems.deleteById(i.id);

    }));


    await PharmacyOrders.deleteById(id);

    return responseJson(res , 204 ,  {
        status:"success",
        message:"order deleted successful",
    });
    
})
