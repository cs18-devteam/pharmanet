const Users = require("../../models/UserModel");
const { response } = require("../common/response");
const view = require("../common/view");


exports.renderCustomerProfile = async (req , res)=>{
    try{
        const customer = await Users.get(req.customerId)[0];
        if(!customer) return view('404' , {
            header : view('component.header' , {
                name:"Antibiotics",
            }),
            navbar : view('components/navbar.customer' , {
                name : `${customer?.firstName  } ${customer?.lastName }`
            }) ,
            footer: view('footer'),
            cart : view('customer/component.cart'),
        });
        
        for(const [key , value] of Object.entries(customer)){
            if(!value){
                customer[key] = " ";
            }
        }

        return view("customer.profile" , {
            header : view('component.header' , {
                name:`${customer.firstName} ${customer.lastName} || Account - Pharmanet`,
            }),
            navbar : view('components/navbar.customer' , {
                name : `${customer?.firstName  } ${customer?.lastName }`
            }) ,
            ...customer ,
            role: 'Customer',
            mobileNumber : " " ,
            address : (customer.street || customer.addressNo || customer.street || customer.town || customer.province) ?  
                `<button class="address_add_button"> + Add Your address</button>` 
            : 
                `<input type="text" value="{addressNo}" disabled class="update-field update-field_no"><Br>
                <input type="text" value="{street}" disabled class="update-field update-field_street"><br>
                <input type="text" value="{town}" disabled class="update-field update-field_town"><br>
                <input type="text" value="{province}" disabled class="update-field update-field_province"><br>`,
            cart : view('customer/component.cart'),
        })
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}
