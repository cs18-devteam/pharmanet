const UserTypes = require("../helpers/UserTypes");


exports.redirectUsers = async (req, res)=>{
    console.log(req.userType);


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
            

        }

        res.end();


    }else{
        res.writeHead(404 , {
            "Content-Type":"text/html",
            "Location":"/index.html"
        });
        res.end()
    }
}
