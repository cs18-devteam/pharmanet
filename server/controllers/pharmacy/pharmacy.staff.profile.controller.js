const { response } = require("../../common/response");
const Bridge = require("../../common/Bridge");
const { getRequestData } = require("../../common/getRequestData");
const view = require("../../common/view");
const { catchAsync } = require("../../common/catchAsync");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");

exports.getStaffProfile = async (req , res)=>{
    try{

        
        if(data){
            return view('customer.home' , {
                header : view('component.header' , {
                    name:"Antibiotics",
                }),
                navbar: view('components/navbar' , {
                    id: data.id,
                    name : `${data.firstName} ${data.lastName}`
                }),
                footer: view('footer'),})
        }
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }
}



exports.renderStaffProfile = catchAsync(async (req , res)=>{
        const [staff] = (await PharmacyStaff.getById(req.staffId));
        const [customer] = await Users.getById(staff.userId);
        if(!staff) return response(res , "your are not authorized" , 302);

        
        return response(res , view('pharmacy/staff.profile' , {
                header : view('component.header' , {
                        name:`${customer?.firstName  } ${customer?.lastName } || Account Setting`,
                }),
                navbar : view('pharmacy/navbar.staff' , {
                                name : `${customer?.firstName  } ${customer?.lastName }` ,
                                staffId : staff.id,
                                pharmacyId : staff.pharmacyId,
                            }) ,
                footer : view('footer'),
                cart : view('customer/component.cart'),
                ...customer,
                ...staff,
        }) , 200);

})
