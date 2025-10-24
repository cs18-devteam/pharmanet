const Bridge = require("../common/Bridge");
const customerFetch  = require("../common/controllers/customerFetch");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerMedicines = async (req , res)=>{

    try{

        const response =await fetch(`${Bridge.registry.CUSTOMER_SERVICE}?id=${req.customerId}`);
        const results = await response.json();
        const customer = results.data[0];
                
        Bridge.pipe(req , res)
        .connect(Bridge.registry.MEDICINE_SERVICE , {
            method :"GET"
        })
        .request()
        .json((data)=>{
            console.log(data)
        })
        .resend((results)=>{
            const medicines = results.data;
            
            if(!customer) return view('404');
            return view('customer.search' , {
                navbar : view('components/navbar.customer' , {
                    name : `${customer?.firstName} ${customer?.lastName}`,
                    id : customer?.id
                }, 
                customer) ,
                results : medicines.map(medicine=>view('components/medicine.search.card' , medicine)).join(' ')
            })
        }).catch(error=>{
            throw error;
        })
        
    }catch(error){
        response(res , view('404') , 400);
    }


}
exports.renderCustomerSelectedMedicine = async (req , res)=>{
    return response(res , view("customer.search") , 200);
}




