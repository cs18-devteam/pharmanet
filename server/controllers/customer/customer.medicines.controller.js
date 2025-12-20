const { response } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const Users = require("../../models/UserModel");


exports.renderCustomerMedicines = async (req , res)=>{

    try{
        const customer = (await Users.getById(req.customerId))[0];
        const medicines = await Medicines.query("select * from this.table where id > 0 limit 20");
        
        if(!customer) return view('404');
        return response(res ,view('customer/customer.medicines.view' , {
            ...customer,
            header : view('component.header' , {
                name:"Search Medicines",
            }),
            medicine_cards : medicines.map(m=>view('customer/component.medicine.card' , {userId : customer.id ,...m , name : m.geneticName , price : "not available" , publicStock : "not available"})).join(' '),
            count: medicines.length,
            navbar : view('customer/navbar.customer', customer) ,
            footer: view('footer'),
            cart : view('customer/component.cart'),
            results : medicines.map(medicine=>view('customer/medicine.search.card' , medicine)).join(' ')
        }) , 200)


    }catch(error){
        console.log(error);
        response(res , view('404') , 400);
    }


}
exports.renderCustomerSelectedMedicine = async (req , res)=>{
    try{
        const [medicine] = await Medicines.getById(req.medicineId);
        const [customer] = await Users.getById(req.customerId);

        console.log(medicine);

        return response(res , view("customer/customer.medicine.blog" , {
            header : view('component.header' , {
                name:medicine.geneticName,
            }),
            navbar : view('customer/navbar.customer', customer) ,
            footer: view('footer'),
            ...medicine,
            cart : view('customer/component.cart'),
        }) , 200);
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}





