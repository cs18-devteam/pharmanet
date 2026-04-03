const readCookies = require("../common/readCookies");
const { responseJson, response } = require("../common/response");
const Pharmacies = require("../models/PharmacyModel");
const PharmacyStaff = require("../models/PharmacyStaffModel");

exports.PERMISSIONS = {
    createOrder: 'createOrder',
    deleteOrder: 'deleteOrder',
    readOrder: "readOrder",
    updateOrder: " updateOrder",
    readTransactions: "readTransactions",
    searchProducts: "searchProducts",
    updateProducts: "updateProducts",
    deleteProducts: "deleteProducts",
    createProducts: "createProducts",
    searchMedicines: "searchMedicines",
    createMedicines: "createMedicines",
    deleteMedicines: "deleteMedicines",
    updateMedicines: "updateMedicines",
    searchStaff: "searchStaff",
    updateStaff: "updateStaff",
    deleteStaff: "deleteStaff",
    createStaff: "createStaff",
}




exports.authorizeToView = (permissions = []) => {
    return async (req, res, next) => {
        try {

            const { staffId } = readCookies(req);
            const [staff] = await PharmacyStaff.getById(staffId);

            if (!staff) return response(res, "", 302, {
                location: "/login",
            })

            let authorized = true;
            permissions.forEach(p => {
                if (!staff[p]) {
                    authorized = false;
                }
            })

            if (!authorized) return response(res, "", 302, {
                location: "/login",
            })


            return next();

        } catch (e) {
            console.log(e);
            return response(res, "", 302, {
                location: "/login",
            })
        }
    }
}

exports.authorizeToApi = (permissions = []) => {
    return async (req, res, next) => {
        try {

            const { staffId } = readCookies(req);
            const [staff] = await PharmacyStaff.getById(staffId);

            if (!staff) return responseJson(res , 401 , {
                status:"error",
                message:"your are unauthorized",
            } )

            
            let authorized = true;

            if(typeof permissions == "string"){

                if(!staff[permissions]){
                    authorized = false;
                }
            }else{
                permissions.forEach(p => {
                    console.log(staff);
                    if (!staff[p]) {
                        authorized = false;
                    }
                })
            }



            if (!authorized) return responseJson(res , 401 , {
                status:"error",
                message:"your are unauthorized",
            })

            return next();

        } catch (e) {
            console.log(e);

            return responseJson(res , 401 , {
                status:"error",
                message:"your are unauthorized",
            })
        }


    }
}

exports.authenticateStaffApi = ()=>{
    return async (req , res , next)=>{
        try{
            const {staffId , pharmacyId} = readCookies(req);
            if(!staffId || !pharmacyId) throw new Error("don' t have staffId or pharmacyId");

            const [staff] = await PharmacyStaff.getById(staffId);
            if(!staff) throw new Error("fake staffId");

            const [pharmacy] = await Pharmacies.getById(pharmacyId);
            if(!pharmacy) throw new Error("fake pharmacyId");

            if(staff.pharmacyId != pharmacy.id){
                throw new Error("you're not member of this pharmacy");
            }

            return next();

        }catch(e){
            console.log(e);
            return responseJson(res , 401 , {
                status:"error",
                message:"your are unauthorized",
            })

        }    
    }
} 