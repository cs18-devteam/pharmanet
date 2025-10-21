// const Bridge = require("../common/Bridge");
// const { getRequestData } = require("../common/getRequestData");
// const { response } = require("../common/response");
// const view = require("../common/view");

// exports.renderSignup = async (req , res)=>{
//     return response(res , view('signup') , 200);
// }


// exports.createUser = async (req , res)=>{
//     Bridge.pipe(req , res)
//     .connect(Bridge.registry.CUSTOMER_SERVICE , {
//         method : "POST",

//     }).request(async (req , res)=>{
//         const userData = await getRequestData(req);
//         return userData;
//     }).json()
//     .resend((data)=>{
//         if(data){
//             return view('customer.home' , {
//                 navbar: view('components/navbar' , {
//                     id: data.id,
//                     name : `${data.firstName} ${data.lastName}`
//                 })
//             }  , {
//                 id: data.id,
//             });

//         }

//         return JSON.stringify({
//             status : "error",
//             message : "Invalid details",
//         })

//     });
// }


// --- Authenticate user (Login) ---
const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { response } = require("../common/response");
const view = require("../common/view");
const crypto = require("crypto");

const users = [];

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function findUserByEmail(email) {
    return users.find(u => u.email === email);
}

exports.renderSignup = async (req, res) => {
    return response(res, view("signup"), 200);
};

exports.renderLogin = async (req, res) => {
    return response(res, view("login"), 200);
};

exports.createUser = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.CUSTOMER_SERVICE, {
            method: "POST",
        })
        .request(async (req) => {
            const userData = await getRequestData(req);
            const { firstName, lastName, email, password } = JSON.parse(userData);

            if (!firstName || !lastName || !email || !password) {
                return JSON.stringify({ status: "error", message: "Missing required fields" });
            }

            if (findUserByEmail(email)) {
                return JSON.stringify({ status: "error", message: "User already exists" });
            }

            const hashed = hashPassword(password);
            const newUser = {
                id: users.length + 1,
                firstName,
                lastName,
                email,
                password: hashed,
            };
            users.push(newUser);

            return JSON.stringify({
                status: "success",
                message: "User created successfully",
                data: newUser,
            });
        })
        .json()
        .resend((data) => {
            if (data && data.data) {
                const user = data.data;
                return view(
                    "customer.home",
                    {
                        navbar: view("components/navbar", {
                            id: user.id,
                            name: `${user.firstName} ${user.lastName}`,
                        }),
                    },
                    { id: user.id }
                );
            }

            return JSON.stringify({
                status: "error",
                message: "Invalid details",
            });
        });
};

exports.loginUser = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.CUSTOMER_SERVICE, {
            method: "POST",
        })
        .request(async (req) => {
            const loginData = await getRequestData(req);
            const { email, password } = JSON.parse(loginData);

            const user = findUserByEmail(email);
            if (!user) {
                return JSON.stringify({ status: "error", message: "User not found" });
            }

            const hashed = hashPassword(password);
            if (user.password !== hashed) {
                return JSON.stringify({ status: "error", message: "Invalid credentials" });
            }

            const token = crypto.randomBytes(16).toString("hex");
            user.token = token;

            return JSON.stringify({
                status: "success",
                message: "Login successful",
                data: { id: user.id, firstName: user.firstName, lastName: user.lastName, token },
            });
        })
        .json()
        .resend((data) => {
            if (data && data.data) {
                const user = data.data;
                return view(
                    "customer.home",
                    {
                        navbar: view("components/navbar", {
                            id: user.id,
                            name: `${user.firstName} ${user.lastName}`,
                        }),
                    },
                    { id: user.id }
                );
            }

            return JSON.stringify({
                status: "error",
                message: "Invalid login credentials",
            });
        });
};

// --- Simple auth middleware (for later use) ---
exports.verifyAuth = (req, res, next) => {
    const token = req.headers["authorization"];
    const user = users.find((u) => u.token === token);

    if (!user) {
        return response(res, JSON.stringify({ status: "error", message: "Unauthorized" }), 401);
    }

    req.user = user;
    next();
};


