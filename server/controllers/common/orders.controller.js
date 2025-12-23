const {apiCatchAsync} = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Carts = require("../../models/CartModel");
const PharmacyOrdersItems = require("../../models/PharmacyOrderItemsModel");
const PharmacyOrders = require("../../models/PharmacyOrderModel");


exports.createOrder = apiCatchAsync(async (req , res)=>{

        const reqData = JSON.parse(await getRequestData(req));
        const carts = reqData.carts;
        const items = reqData.items;
        let ordersData  = [];
        
        const [order] =await  PharmacyOrders.save({
            userId : reqData.userId,
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

        const orders= await Promise.all(ordersData.map(async (item)=>{
            return await PharmacyOrdersItems.save({
                orderId: order.id,
                itemId : item.productId || item.medicineId,
                itemType : item.productId ? "product" : "medicine",
                quantity : item.quantity,
            })
        }))

        return responseJson(res , 201 , {
            status:"success",
            results: {
                orderId : order.id , 
                pharmacyId : order.pharmacyId,
                items: orders,
                userId : order.userId,
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

    return responseJson(res , 200 , {
        status:"success",
        results,
        count: results.length,
    })

});

