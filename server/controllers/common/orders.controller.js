const { apiCatchAsync } = require("../../common/catchAsync");
const Convert = require("../../common/Convert");
const File = require("../../common/File");
const getMultipartData = require("../../common/getMultipartData");
const { getRequestData } = require("../../common/getRequestData");
const readCookies = require("../../common/readCookies");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Carts = require("../../models/CartModel");
const LoyaltyPoints = require("../../models/LoyaltyPointModel");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const PharmacyOrdersItems = require("../../models/PharmacyOrderItemsModel");
const PharmacyOrders = require("../../models/PharmacyOrderModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Products = require("../../models/ProductModel");
const Transactions = require("../../models/TransactionModel");
const Users = require("../../models/UserModel");


exports.createOrder = apiCatchAsync(async (req, res) => {

    const reqData = JSON.parse(await getRequestData(req));
    const carts = reqData.carts;
    const items = reqData.items;
    const pharmacyId = reqData.pharmacyId;
    const customerId = reqData.userId;
    const { staffId } = readCookies(req);
    let ordersData = [];
    let total = 0;
    let discount = 0;

    const [order] = await PharmacyOrders.save({
        staffId: staffId,
        userId: reqData.userId,
        pharmacyId: pharmacyId,
        createdAt: Convert.toSqlDate(Date.now()),
        prescription : reqData.prescription,
    })

    if (carts && carts.length) {
        let cartsData = carts.map(async cid => {
            return await Carts.get({
                userId: reqData.userId,
                id: cid,
            })
        });

        ordersData = await Promise.all(cartsData).then(data => data.map(d => d[0]));
        await Promise.all(ordersData.map(async o=>{

            await PharmacyOrdersItems.save({
                itemId : o.medicineId,
                quantity : 1,
                price : 0,
                itemType:"medicine",
                orderId : order.id,
            })
        }))
    
    
    }

    let orders;
    if (items) {

        orders = await Promise.all(items.map(async (item) => {



            let orderItem;
            if (item.itemType == "medicine") {
                [orderItem] = await PharmacyMedicines.get({
                    pharmacyId: pharmacyId,
                    medicineId: item.itemId
                });

                if (orderItem.publicStock < item.quantity) {
                    throw new Error(`insufficient medicine stock`);
                }


                await PharmacyMedicines.update({
                    id: orderItem.id,
                    publicStock: orderItem.publicStock - item.quantity,
                    stock: orderItem.stock - item.quantity,
                })

                total += orderItem.price * item.quantity - item.discount;
            } else {
                orderItem = (await Products.getById(item.itemId))[0];

                if (orderItem.quantity < item.quantity) {
                    throw new Error(`insufficient product stock`);
                }


                await Products.update({
                    id: orderItem.id,
                    quantity: orderItem.quantity - item.quantity,
                })

                total += orderItem.price * item.quantity - item.discount;

            }


            return await PharmacyOrdersItems.save({
                orderId: order.id,
                itemId: item.itemId,
                itemType: item.itemType == "product" ? "product" : "medicine",
                quantity: item.quantity,
                price: orderItem?.price,
                discount: item.discount || "0.0",
            })
        }))
    }


    let staff;
    if (reqData.staffId) {
        const [staff] = await PharmacyStaff.getById(reqData.staffId);

        if (!staff) throw new Error("staff member not found");
    }

    if (reqData.userId) {
        const [user] = await Users.getById(reqData.userId);
        if (!user) throw new Error("user not in our system");
    }

    let transaction;
    if (reqData.paymentMethod == "cash" && pharmacyId) {

        [transaction] = await Transactions.save({
            orderId: order.id,
            staffID: staffId,
            pharmacyId: reqData.pharmacyId,
            method: reqData.paymentMethod,
            amount: total,
            userId: reqData.userId,
            type: reqData.type || "offline",
            status: reqData.paymentStatus,
            transactionDateTime: Convert.toSqlDate(Date.now()),


        })

        if(transaction){
            PharmacyOrders.update({
                id: order.id,
                status:"completed",
            })
        }
    }


    await LoyaltyPoints.save({
        PharmacyId: pharmacyId,
        CustomerId: customerId,
        LoyaltyPoints: reqData.amount * 0.01,
    })



    return responseJson(res, 201, {
        status: "success",
        results: {
            orderId: order.id,
            pharmacyId: order.pharmacyId,
            items: orders,
            userId: order.userId,
            amount: total,
            transaction: transaction,
        }
    })
})


exports.getOrders = apiCatchAsync(async (req, res) => {
    const userId = req.params.get('user');
    let pharmacyId = req.params.get('pharmacy')
    const id = req.params.get('id');

    if (!pharmacyId) {
        pharmacyId = readCookies(req).pharmacyId;
    }

    const filter = {};
    if (userId) filter.userId = userId;
    if (pharmacyId) filter.pharmacyId = pharmacyId;
    if (id) filter.id = id;

    if (!Object.entries(filter).length) throw new Error('pharmacy | userId | id are not defined');

    if (id) {
        const [order] = await PharmacyOrders.getById(id);

        let items = await PharmacyOrdersItems.get({
            orderId: order.id,
        });



        items = await Promise.all(items.map(async i => {
            if (i.itemType == "medicine") {
                const [medicine] = await Medicines.getById(i.itemId);

                let stock;

                if (order.pharmacyId) {

                    stock = (await PharmacyMedicines.get({
                        pharmacyId: order.pharmacyId,
                        medicineId: medicine.id
                    }))[0]
                } else {
                    stock = (await PharmacyMedicines.get({
                        medicineId: medicine.id
                    }))[0]

                }

                return {
                    ...i,
                    name: medicine.geneticName,
                    price: stock?.price || 0,

                }
            } else {
                const [product] = await Products.getById(i.itemId);
                return {
                    ...i,
                    name: product.name,
                    price: product.price,
                }
            }
            return { ...i };
        }))

        let transactions = await Transactions.get({
            orderId : order.id,
        });

        if(order.userId){
            const [user] = (await Users.getById(order.userId));
            if(user){
                order.customer = user.name;
            }

        }

        
        return responseJson(res, 200, {
            status: "success",
            data: {

                ...order,
                transactions,
                isPaid : transactions.length ? true :false, 
                items,
                total: items.reduce((acc, item, i) => {
                    return acc + item.price * item.quantity - item.discount;
                }, 0)
            },
        })
    }



    let results = await PharmacyOrders.get(filter);
    results = results.sort((a , b)=>b.id - a.id)


    let orders = results.map(async (order) => {
        let items = await PharmacyOrdersItems.get({
            orderId: order.id,
        });

        items = await Promise.all(items.map(async i => {
            if (i.itemType == "medicine") {
                const [medicine] = await Medicines.getById(i.itemId);
                return {
                    ...i,
                    name: medicine.geneticName,
                }
            } else {
                const [product] = await Products.getById(i.itemId);
                return {
                    ...i,
                    name: product.name,
                }
            }
            return { ...i };
        }))

        let transactions = await Transactions.get({
            orderId : order.id,
        });

        if(order.userId){
            const [user] = await Users.getById(order.userId);
            if(user){
                order.customer = `${user.firstName} ${user.lastName}`;
                order.address = `${user.addressNo},${user.street},${user.town},${user.province}`
            }
        }

        return {
            ...order,
            items,
            transactions,
            isPaid : transactions.length ? true :false, 
            total: items.reduce((acc, item, i) => {
                return acc + item.price * item.quantity - item.discount;
            }, 0)
        }

    })

    orders = await Promise.all(orders);


    return responseJson(res, 200, {
        status: "success",
        results: orders,
        count: results.length,
    })

});


exports.addOrderItem = apiCatchAsync(async (req, res) => {
    const id = req.orderId;
    const reqData = JSON.parse(await getRequestData(req));
    const { pharmacyId } = readCookies(req);


    let medicine;
    let product;
    if (reqData.medicineId) {
        medicine = (await Medicines.getById(reqData.medicineId))[0];


        if(!medicine) throw new Error("no medicine found")


        medicine.stock = await PharmacyMedicines.get({
            medicineId : medicine.id , 
            pharmacyId : pharmacyId,
        })

        if(!medicine.stock){
            throw new Error("this medicine not in stock");
        }
    }


    if(reqData.medicineId){
        if(reqData.quantity > medicine.stock?.[0].publicStock){
            throw new Error("medicine quantity must be low than current order amount");
        }

        console.log(medicine);

        await PharmacyMedicines.update({
            id: medicine.stock?.[0]?.id,
            publicStock : medicine.stock?.[0].publicStock - reqData.quantity,
        })
    }

    if(reqData.productId){
        product = (await Products.getById(reqData.productId))[0];
        if(reqData.quantity > product.quantity){
            throw new Error("product quantity must be lower than current stock");
        }
        
        await Products.update({
            id: product.id,
            quantity : product.quantity - reqData.quantity,
        })
    }


    const orderObj = {
        orderId: id,
        itemId: +reqData.medicineId || +reqData.productId,
        itemType: reqData.medicineId ? "medicine" : "product",
        price: medicine?.stock[0]?.price || product?.price,
        discount: reqData.discount,
        quantity: reqData.quantity,
    }



    const [orderItem] = await PharmacyOrdersItems.save(orderObj)


    return responseJson(res, 200, {
        status: "success",
        results: orderItem,
    })

});



exports.getOrderItems = apiCatchAsync(async (req, res) => {
    const id = req.orderId;
    const [order] = await PharmacyOrders.getById(id);
    let items = await PharmacyOrdersItems.get({
        orderId: id,
    })

    items = items.map(async i => {
        if (i.itemType == "medicine") {
            return {
                ...i,
                details: (await Medicines.getById(i.itemId))[0],
                stock: (await PharmacyMedicines.get({
                    medicineId: i.itemId,
                    pharmacyId: req.params.get("pharmacyId"),
                }))[0],
            }
        } else if (i.itemType == "product") {
            console.log(i);
            const [product] = await Products.getById(i.itemId);
            console.log(product);

            return {
                ...i,
                details: product,
            }
        }
    })

    items = await Promise.all(items);


    responseJson(res, 200, {
        status: "success",
        results: {
            order,
            items,
        },
        count: 1,
    })
})



exports.deleteOrder = apiCatchAsync(async (req, res) => {
    const id = req.orderId;
    let items = await PharmacyOrdersItems.get({
        orderId: id,
    })
    const {pharmacyId} = readCookies(req);

    console.log(items);

    items = await Promise.all(items.map(async i => {
        if (i.itemType == "medicine") {
            const [stock] = await PharmacyMedicines.get({
                pharmacyId: pharmacyId,
                medicineId : i.itemId,
            });

            const [med] = await Medicines.getById(i.itemId);

            console.log(med , stock);

            if(!med) return undefined;
            if(!stock) return undefined;

            await PharmacyMedicines.update({
                id: stock.id,
                publicStock: stock.publicStock + i.quantity,
                stock: med.stock,
            })
            



        } else if (i.itemType == "product") {
            const [prod] = await Products.getById(i.itemId);

            if (prod) {
                await Products.update({
                    id: i.itemId,
                    quantity: prod.quantity + i.quantity,
                })
            } else {
                throw new Error("cannot find products");
            }
        }

        return await PharmacyOrdersItems.deleteById(i.id);

    }));


    await PharmacyOrders.deleteById(id);

    return responseJson(res, 204, {
        status: "success",
        message: "order deleted successful",
    });

})


exports.updateOrder = apiCatchAsync(async (req, res) => {
    const data = JSON.parse(await getRequestData(req));
    const { pharmacyId } = readCookies(req);
    if (!pharmacyId) throw new Error("cannot find pharmacy");


    const [order] = await PharmacyOrders.getById(data.id);

    if (!order) throw new Error("order not found");

    const orderObj = {
        id: data.id,
        status : data.status,
        staffId: data.staffID,
        userId: data.userId,
        pharmacyId: data.pharmacyId,
    }

    console.log(orderObj , data);

    await PharmacyOrders.update(orderObj);




    return responseJson(res, 200, {
        status: "success",
        message: "order updated successful",
    })
})


exports.removeOrderItems = apiCatchAsync(async (req, res) => {
    const { id } = JSON.parse(await getRequestData(req));
    const {pharmacyId} = readCookies(req);
    if (!id) {
        throw new Error("item id not defined");
    }

    const [item] = await PharmacyOrdersItems.getById(id);
    if (!item) throw new Error("item not found in order");

    
    if(item.itemType == "medicine"){
        const [stock] = await PharmacyMedicines.get({
            pharmacyId :  pharmacyId,
            medicineId : item.itemId,
        })
        await PharmacyMedicines.update({
            id :stock.id,
            publicStock : stock.publicStock + item.quantity,
        })


    }else if(item.itemType == "product"){
        const [stock] = await Products.getById(item.itemId);
        await Products.update({
            id : item.itemId,
            quantity : stock.quantity + item.quantity,
        })
    }

    await PharmacyOrdersItems.deleteById(id);

    return responseJson(res, 201, {
        status: "success",
        message: "order item removed from the cart",
    })
})



exports.getOrderSummery = apiCatchAsync(async (req, res) => {
    const pharmacyId = req.params.get("pharmacy");
    if (!pharmacyId) throw new Error("pharmacy id not found");

    const orders = await PharmacyOrders.query(`select * from this.table where DATE(createdAt) = CURDATE() and pharmacyId=${pharmacyId}`);





    const transactions = [];

    await Promise.all(orders?.map(async o => {
        const tr = await Transactions.get({
            orderId: o.id,
        });

        transactions.push(...tr)
    }));

    total = transactions?.reduce((acc, tr) => {
        return acc + (tr.amount || 0)
    }, 0)


    const summery = {
        orders: orders.length,
        total: total,
    };


    return responseJson(res, 200, {
        status: "success",
        data: summery,
    })
})


exports.getOrderSummeryStatusWise = apiCatchAsync(async (req, res) => {
    const pharmacyId = req.params.get("pharmacy");
    if (!pharmacyId) throw new Error("pharmacy id not found");

    const orders = await PharmacyOrders.query(`select status ,count(id) as count from this.table where pharmacyId = ${pharmacyId} group by status`)

    return responseJson(res, 200, {
        status: "success",
        data: orders,
    })
})


exports.createOrderFormPrescription = apiCatchAsync(async (req , res)=>{
    const {prescription} = await getMultipartData(req);
    const {userId} = readCookies(req);
    if(!prescription) throw new Error("prescription not found");
    if(!(prescription instanceof File)){
        throw new Error("prescription must be a file");
    }




    const filePath = "/prescriptions";
    const fileName = `${Date.now()}.${prescription.fileName.split(".").slice(-1)}`
    prescription.rename(fileName);

    const fileStatus = await prescription.save(filePath);
    if(fileStatus.status != "success") throw new Error("file not saved");

    const [order] = await PharmacyOrders.save({
        userId : userId,
        prescription : `${filePath}/${fileName}`,
        status:"pending",
    })
    console.log(order);

    responseJson(res , 200 , {
        status:"success",
        data : order,
        
    })

})