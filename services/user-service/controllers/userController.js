const UserTypes = require("../helpers/UserTypes");


<<<<<<< HEAD
exports.redirectUsers = async (req, res)=>{
    console.log(req.userType);
=======
<<<<<<< HEAD
<<<<<<< HEAD
exports.getAllUsers = (req, res)=>{

    //step 1
    res.writeHead(200 , {"Content-Type":"text/html"} );
    res.write("<h1>users</h1>");
    res.end();
=======
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
exports.getAllUsers =async (req, res)=>{
    
>>>>>>> origin/hamdha/backend/leave


    if(req.userType){
        switch(req.userType){
            case UserTypes.CUSTOMER:
                res.writeHead(301 , {
                    "Location":"/users/customers",
                });
                break;
            case UserTypes.CASHIER:
                res.writeHead(301 , {
                    "Location":"/users/cashiers"
                });
                break;
            case UserTypes.ADMIN:
                res.writeHead(301 , {
                    "Location":'/users/system/admin'
                });
                break;
            case UserTypes.PHARMACIST:
                res.writeHead(301 , {
                    "Location" : '/users/pharmacy/pharmacists'
                });
                break;
            case UserTypes.PHARMACY_OWNER:
                res.writeHead(301 , {
                    "Location":'/users/pharmacy/owners'
                })
                break;
            case UserTypes.STOCK_MANAGER:
                res.writeHead(301 , {
                    "Location": "/users/pharmacy/stockmanager"
                });
                break;
            case UserTypes.SYSTEM_PHARMACY_MANAGER:
                res.writeHead(301 , {
                    "Location" : '/users/system/pharmacymanager'
                });
                break;
            case UserTypes.SYSTEM_STOCK_MANAGER:
                res.writeHead(301 , {
                    "Location":'/users/system/stockmanager',
                });
                break;
            

<<<<<<< HEAD
        }
=======
<<<<<<< HEAD
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
=======
>>>>>>> d11a96628964c4af2658128742abb8e83dc984f0
    return;
>>>>>>> origin/hamdha/backend/leave

        res.end();


    }else{
        res.writeHead(404 , {
            "Content-Type":"text/html",
            "Location":"/index.html"
        });
        res.end()
    }
}
