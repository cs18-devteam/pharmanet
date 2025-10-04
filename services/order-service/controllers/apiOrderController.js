const { getRequestData } = require("../common/getRequestData");
const { responseJson } = require("../common/response");
const Orders = require("../model/OrderModel");
const OrderProducts = require("../model/OrderProductModel");


exports.getOrders =async (req , res)=>{
    const filter = {};
    if(req.params.get('id')) filter.id = req.params.get('id')
    if(req.params.get('user')) filter.user = req.params.get('user')
    if(req.params.get('createdDate')) filter.createdDate = req.params.get('createdDate')
    if(req.params.get('acceptedDate')) filter.acceptedDate = req.params.get('acceptedDate')
    if(req.params.get('acceptedBy')) filter.acceptedBy = req.params.get('acceptedBy')
    if(req.params.get('pharmacyId')) filter.from = req.params.get('pharmacyId')


    let content =  ''
    if(Object.entries(filter).length > 0){
        content = await Orders.get(filter);
    }else{
        content = await Orders.get();
    }

    content.products = content.map(async order =>await OrderProducts.get({orderId : order.id}))
    await Promise.all(content.products);

    responseJson(res , 200 , {
        status : "success",
        data : content,
        count : content.length,
    })
    
}


exports.deleteOrder =async (req , res)=>{
    const {id} = JSON.parse(await getRequestData(req));
    const order = await Orders.getById(id);
    let results;

    try{
        results = await Orders.deleteById(id);

    }catch(e){
        Orders.save(order);
        return responseJson(res , 400 , {
            status:"error",
            error : e,
        })
    }

    try{
        const orderProducts = await OrderProducts.get({orderId : id});
        const deleteList = orderProducts.map(async product=>OrderProducts.deleteById(product.id));
        await Promise.all(deleteList);
    }catch(e){
        return responseJson(res , 500 , {
            status:"error",
            error:e,
        })
    }
    
    return responseJson(res , 204 , {
        status: 'success',
        data: results,
    });
}


exports.updateOrder = async (req , res)=>{
    const {id , user , createdDate , acceptedDate , acceptedBy , pharmacyId , products} = JSON.parse(await getRequestData(req));
    const results = await Orders.update({
        id , user , createdDate , acceptedDate , acceptedBy , pharmacyId
    });

    if(products){
        const productResults = products.map(async product=> await OrderProducts.update({orderId :id , ...product}));
    }
    
    return responseJson(res , 200 , {
        status: 'success',
        data: results,
    });
}


exports.createOrder = async (req , res)=>{
    const {id , user , createdDate , acceptedDate , acceptedBy , pharmacyId} = JSON.parse(await getRequestData(req));
    const newLeaveRequest = await Orders.save({
        id , user , createdDate , acceptedDate , acceptedBy , pharmacyId
    });
    
    return responseJson(res , 201 , {
        status: 'success',
        data: newLeaveRequest,
        count : newLeaveRequest.length,
    });
}