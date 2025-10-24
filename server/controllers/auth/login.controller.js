
const Bridge = require("../../common/Bridge");
const { encrypt, createToken } = require("../../common/encrypt");
const { getRequestData } = require("../../common/getRequestData");
const { response } = require("../../common/response");
const view = require("../../common/view");

exports.renderLogin = async (req , res)=>{
    return response(res , view("login") , 200);
}



// Render login page
exports.renderLogin = async (req, res) => {
    return response(res, view("login"), 200);
};

// Login function
exports.login = async (req, res) => {
    try {
        // Get credentials from request body
        const credentials = JSON.parse(await getRequestData(req));

        if (!credentials.email || !credentials.password) {
            return response(res, JSON.stringify({ status: "error", message: "Email and password are required" }), 400);
        }

        console.log(`${Bridge.registry.CUSTOMER_SERVICE}?email=${credentials.email}`);

        const customerRespond = await fetch(`${Bridge.registry.CUSTOMER_SERVICE}?email=${credentials.email}`);
        const staffRespond = await fetch(`${Bridge.registry.STAFF_SERVICE}?email=${credentials.email} `);

        const customerJson = await customerRespond.json();
        const staffMemberJson = await staffRespond.json();

        if(!customerJson || !staffMemberJson) return response(res , JSON.stringify({
            status:"error",
            message:"internal server error",
        }));

        const customer = customerJson.data[0];
        const staffMember = staffMemberJson.data[0];

        if(!customer && !staffMember) return response(res , JSON.stringify({
            status:"error",
            message :"Wrong email or password",
        }));

        if(customer){
            const token = createToken(customer);
            
            return response(res  , 
                JSON.stringify({
                status:"success",
                data: customer,
                message:"Welcome to pharmanet"
            }) , 200 , {
                "Authentication" : token,
                "Set-Cookie" : `token=${token};path=/;expires=${Date.now()/1000+60}`
            });
        

        }

        

    } catch (err) {
        console.error("Login error:", err);
        return response(res, { status: "error", message: "Internal server error" }, 500);
    }
};
