const Bridge = require("../../common/Bridge");
const { response } = require("../../common/response");
const view = require("../../common/view");

exports.getAll =async  (req , res)=>{
    const respond   = await fetch(Bridge.registry.PRODUCT_SERVICE);
    const {data : products} = await respond.json();
    response(res , view('admin/view' , {
        service :"product",
        items : products.map(p=>view('admin/item' , {...p , service:"products"})) 
    }) , 200);
}

exports.getItem =async  (req , res)=>{
    const respond   = await fetch(`${Bridge.registry.PRODUCT_SERVICE}?id=${req.id}`);
    const {data : products} = await respond.json();
    response(res , view('admin/read' , {
        service :"products",
        rows: (products[0]) ? Object.entries(products[0])?.map(([key , value])=>{
            console.log(key , value);
            return view('admin/row' , {key , value})
        }).join('') : "",
    }) , 200);
}

exports.create = async (req , res)=>{
    const body = await getRequestData(req);

    console.log(body)
    const respond = await fetch(Bridge.registry.STAFF_SERVICE , {
        method:"POST",
        body
    })

    const data = await respond.json();
    return response(res , JSON.stringify(data) , 200)
}

exports.renderCreatePage = async (req , res)=>{
    return response(res , view('admin/medicines/create' ,{
        service:"medicine"
    } ),200)
}