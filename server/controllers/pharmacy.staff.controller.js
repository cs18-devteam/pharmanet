const { response } = require("../common/response")
const view = require("../common/view")
const Bridge = require("../common/Bridge");

// Bridge.registry.health();


exports.renderPharmacyStaff = async( req , res) =>{
    Bridge.pipe(req , res).connect(Bridge.registry.STAFF_SERVICE , {
        method : "GET",
        headers : {
            "Content-type" : "application/json",
        }

    }).request( async (req , res , error)=>{
        return JSON.stringify({
            pharmacyId : req.pharmacyId,
        });

    }).json(async (data , req , res)=>{
        return data;
    }).resend((data)=>{
        return view('pharmacy.staff' , {
            members : data.data.map(m => {
                return view('/components/member.card' , {
                    memberId: m.id,
                    firstName : m.firstName,
                    lastName : m.lastName,
                    pharmacyId : m.pharmacyId,
                    role: m.role,
                });

            }

            ).join(' '),
        });

    } , 200)
    .catch(e=>console.log(e));

}




exports.renderPharmacyStaffProfile = async( req , res) =>{
    Bridge.pipe(req , res).connect(Bridge.registry.STAFF_SERVICE , {
        method : "GET",
        headers : {
            "Content-type" : "application/json",
        }

    }).request( async (req , res , error)=>{
        return JSON.stringify({
            pharmacyId : req.pharmacyId,
            id : req.staffId,
        });

    }).json(async (data , req , res)=>{
        return data;
    }).resend((res)=>{
        const [data] = res.data;
        return view('pharmacy.staff.profile' , data);

    } , 200)
    .catch(e=>console.log(e));
}