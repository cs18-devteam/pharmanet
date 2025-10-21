const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const view = require("../common/view");

exports.getStaffProfile = async (req , res)=>{
    Bridge.pipe(req , res)
    .connect(Bridge.registry.STAFF_SERVICE , {
        method : "GET",

    }).request(async (req , res)=>{
        const userData = await getRequestData(req);
        return userData;
    }).json()
    .resend((data)=>{
        if(data){
            return view('customer.home' , {
                navbar: view('components/navbar' , {
                    id: data.id,
                    name : `${data.firstName} ${data.lastName}`
                })
            }  , {
                id: data.id,
            });

        }

        return JSON.stringify({
            status : "error",
            message : "Invalid details",
        })

    });

    return response(res ,  )
}
