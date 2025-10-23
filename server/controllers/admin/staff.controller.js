const Bridge = require("../../common/Bridge");
const { getRequestData } = require("../../common/getRequestData");
const { response } = require("../../common/response");
const view = require("../../common/view");

exports.getAll =async  (req , res)=>{
    const respond   = await fetch(Bridge.registry.STAFF_SERVICE);
    const {data : products} = await respond.json();
    response(res , view('admin/view' , {
        service :"staff",
        items : products.map(p=>view('admin/item' , {...p , service:"staff"})) 
    }) , 200);
}

exports.getItem =async  (req , res)=>{
    const respond   = await fetch(`${Bridge.registry.STAFF_SERVICE}?id=${req.id}`);
    const {data : products} = await respond.json();
    response(res , view('admin/read' , {
        service :"staff",
        rows: Object.entries(products[0]).map(([key , value])=>view('admin/row' , {key , value})).join('')
    }) , 200);
}

exports.create = async (req , res)=>{
    const body = await getRequestData(req);

    console.log(body)
    const respond = await fetch(Bridge.registry.CUSTOMER_SERVICEd , {
        method:"POST",
        body
    })

    const data = await respond.json();
    return response(res , JSON.stringify(data) , 200)
}

exports.renderCreatePage = async (req , res)=>{
    return response(res , view('admin/staff/create' ,{
        service:"medicine"
    } ),200)
}