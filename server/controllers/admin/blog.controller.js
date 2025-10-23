const Bridge = require("../../common/Bridge");
const { response } = require("../../common/response");
const view = require("../../common/view");

exports.getAll =async  (req , res)=>{
    const respond   = await fetch(Bridge.registry.BLOG_SERVICE);
    const {data : products} = await respond.json();
    response(res , view('admin/view' , {
        service :"blogs",
        items : products.map(p=>view('admin/item' , {...p , service:"blogs"})) 
    }) , 200);
}

exports.getItem =async  (req , res)=>{
    const respond   = await fetch(`${Bridge.registry.BLOG_SERVICE}?id=${req.id}`);
    const {data : products} = await respond.json();
    response(res , view('admin/read' , {
        service :"blogs",
        rows: Object.entries(products[0]).map(([key , value])=>view('admin/row' , {key , value})).join('')
    }) , 200);
}

exports.create = async (req , res)=>{
    const body = await getRequestData(req);

    console.log(body)
    const respond = await fetch(Bridge.registry.BLOG_SERVICE , {
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