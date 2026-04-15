const { decrypt } = require("../common/encrypt");
const readCookies = require("../common/readCookies");
const { response } = require("../common/response");
const view = require("../common/view");
const PharmacyStaff = require("../models/PharmacyStaffModel");
const Users = require("../models/UserModel");



exports.authenticate = (userId, roles = ['*'], permissions = ['*']) => {
    return async (req, res, next) => {
        try {

            const id = req[userId];
            if (!id) throw new Error("no user id found");
            const [user] = await Users.getById(id);

            if (!user) throw new Error("no user found for user id " + id);

            const cookies = readCookies(req);
            const token = JSON.parse(decrypt(cookies.token));

            if (user.id == token.id && user.email == token.email) {
                if (permissions.includes("*")) {
                    return next();
                }
            }





            return response(res, view("login", {
                header: view('component.header', {
                    name: "Login || Pharmanet Pharmacy Management",
                }
                )
            }), 302, {
                location: "/login"
            });



        } catch (e) {
            console.log(e);
            return response(res, view("login", {
                header: view('component.header', {
                    name: "Login || Pharmanet Pharmacy Management",
                }
                )
            }), 302, {
                location: "/login"
            });
        }

    }
}

exports.grantAccess = (...roles) => {
    return async (req, res, next) => {
        if (!req.user) throw new Error('need run authenticate middleware first for use grant access ')
        return next();
    }
}



exports.authenticateStaff = (staffId) => {
    return async (req, res, next) => {
        try {
            const id = req[staffId];
            if (!id) throw new Error("no staff id found");
            const [staff] = await PharmacyStaff.getById(id);
            if (!staff) throw new Error("staff member not found");

            const {  token:tokenEncrypted } = readCookies(req);
            const userId = staff.userId;
            if(!userId) throw new Error("no user id found")
            const [user] = await Users.getById(userId);
            if(!user) throw new Error("user not found");

            const token = JSON.parse(decrypt(tokenEncrypted));

            if (userId == token.id && user.email == token.email) {
                    return next();
            }

            throw new Error("authentication failed");

        } catch (e) {
            console.log(e);
            return response(res, view("login", {
                header: view('component.header', {
                    name: "Login || Pharmanet Pharmacy Management",
                }
                )
            }), 302, {
                location: "/login"
            });

        }
    }
}





