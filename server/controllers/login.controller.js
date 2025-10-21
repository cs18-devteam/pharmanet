
const Bridge = require("../common/Bridge");
const { getRequestData } = require("../common/getRequestData");
const { response } = require("../common/response");
const view = require("../common/view");

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
        const credentials = await getRequestData(req);

        if (!credentials.email || !credentials.password) {
            return response(res, { status: "error", message: "Email and password are required" }, 400);
        }

        // Call Auth Service via Bridge
        Bridge.pipe(req, res)
            .connect(Bridge.registry.AUTH_SERVICE, { method: "POST" })
            .request(async (req, res) => {
                return credentials; // Send { email, password } to auth service
            })
            .json()
            .resend((data) => {
                if (data && data.token) {
                    // Successful login
                    return response(res, {
                        status: "success",
                        message: "Login successful",
                        user: data.user,    // user info from auth service
                        token: data.token,  // JWT or session token
                    }, 200);
                }

                // Invalid credentials
                return response(res, { status: "error", message: "Invalid email or password" }, 401);
            });

    } catch (err) {
        console.error("Login error:", err);
        return response(res, { status: "error", message: "Internal server error" }, 500);
    }
};
