const { response } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const Users = require("../../models/UserModel");


exports.renderCustomerMedicines = async (req , res)=>{

    try{
        const customer = (await Users.getById(req.customerId))[0];
        const medicines = await Medicines.query("select * from this.table where id > 0 limit 20");
        console.log(medicines  , customer);
        
        if(!customer) return view('404');
        return response(res ,view('customer/customer.medicine.view' , {
            ...customer,
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            medicine_cards : medicines.map(m=>view('customer/component.medicine.card' , {...m , name : m.geneticName , price : "not available" , publicStock : "not available"})),
            count: medicines.length,
            navbar : view('customer/navbar.customer', customer) ,
            results : medicines.map(medicine=>view('customer/medicine.search.card' , medicine)).join(' ')
        }) , 200)


    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }


}
exports.renderCustomerSelectedMedicine = async (req , res)=>{
    try{

        return response(res , view("customer.search" , {
            header : view('component.header' , {
                name:"Antibiotics",
            })
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}



