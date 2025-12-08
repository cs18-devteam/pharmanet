const { response } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");



exports.renderPharmacyStaff = async( req , res) =>{
    try{

        
        return view('pharmacy/pharmacy.member.intro' , {
            members : [].map(m => {
                return view('/components/member.card' , {
                    memberId: 1,
                    firstName : 'chathura',
                    lastName : 'priyashan',
                    pharmacyId : 1,
                    role: 'pharmacist',
                    header : view('component.header' , {
                        name:"Antibiotics",
                    }),
                    footer: view('footer'),
                });
                
            }
            
        ).join(' '),
    });
    }catch(e){
        console.log(e);
        return response(res , view('404') , 404);
    }

}




exports.renderPharmacyStaffProfile = async( req , res) =>{
        const [data] = await Users.getById(req.staffId);
        return view('pharmacy.staff.profile' , data);

}