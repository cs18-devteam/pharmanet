const { catchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { responseJson, response } = require("../../common/response");
const { hashPassword } = require("../../common/Auth");
const view = require("../../common/view");
const Users = require("../../models/UserModel");

exports.renderAdminUsersView = async (req, res) => {
    console.log(`renderAdminUsersView called with adminId: ${req.adminId}`);
    const [admin] = await Users.getById(req.adminId);
    console.log("Admin fetched:", admin);

    return response(res, view('admin/users', {
        sidebar: view('admin/component.sidebar', admin),
        header: view('component.header', {
            name: "Users || Pharmanet - Manage all users here",
        }),
        ...admin // Pass admin properties (like id) to the view
    }), 200);
}

exports.renderAddUsersView = async (req, res) => {
    // Pass adminId to the view (assuming req.adminId or part of URL)
    let adminId = req.adminId;
    if (!adminId) {
        // Fallback: try to match from URL
        const parts = req.url.split('/');
        // Expected: /admin/123/addUsers... so 123 is index 2?
        // But req.url might be full or relative. 
        // If AppRouter parses regex, it should be in req.params or req.
        // Let's assume req.adminId might be set by middleware, if not we will let the client handle split if strictly needed, 
        // but here we can try to extract. 
        // Actually, if we look at adminUsersRouter, the base path is /admin/:adminId
    }
    return response(res, view('admin/addUsers', { adminId: req.adminId || req.params?.adminId, id: req.adminId || req.params?.adminId }), 200);
}

exports.createUser = catchAsync(async (req, res) => {
    const rawData = await getRequestData(req);
    if (!rawData) {
        return response(res, "Empty request body", 400);
    }
    let body;
    try {
        body = JSON.parse(rawData);
    } catch (error) {
        return response(res, "Invalid JSON", 400);
    }
    let { fname, lname, email, pharmacy, role, avatar } = body;
    let adminId = req.adminId;
    if (!adminId && req.url) {
        const parts = req.url.split('/');
        if (parts[1] === 'admin' && parts[2]) {
            adminId = parts[2];
        }
    }
    const name = `${fname} ${lname}`.trim();
    const defaultPassword = "TempPass123";
    const hashedPasswordStr = hashPassword(defaultPassword);

    // Map request data to UserModel fields
    const newUser = await Users.save({
        firstName: fname,
        lastName: lname,
        fullName: name,
        name: name,
        email,
        pharmacy,
        role,
        password: hashedPasswordStr,
        profile: avatar,
        avatar: avatar, // Add avatar field
        // Add required default fields if necessary (based on signup controller)
        verified: 1, // Admin added users are verified?
        status: 'Active',
    });
    return responseJson(res, 201, newUser);
})


exports.updateUserStatus = async (req, res) => {
    console.log("updateUserStatus called");
    try {
        const urlParts = req.url.split('/');
        // Extract ID from the end of the URL
        const id = urlParts[urlParts.length - 1];
        // Pass req object to getRequestData, NOT req.adminId
        const requestData = await getRequestData(req);
        console.log("Request Data:", requestData);
        if (!requestData) {
            return responseJson(res, 400, { message: "Empty request body" });
        }
        let status,role;
        try {
            ({ status } = JSON.parse(requestData));
        } catch (parseErr) {
            console.error("JSON parse error in updateUserStatus:", parseErr);
            return responseJson(res, 400, { message: "Invalid JSON" });
        }
        console.log(`Updating user ${id} status to ${status}`);

        // Use Users model to update status
        await Users.update({ id: id, status: status, role: role });

        console.log("Update successful");
        return responseJson(res, 200, { message: 'Status updated' });
    } catch (e) {
        console.error("Error in updateUserStatus:", e);
        return responseJson(res, 500, { message: "Internal Server Error", error: e.toString() });
    }
}

exports.viewProfile = async (req, res) => {
    const url = new URL(req.url, 'http://loacalhost:3000');
    const id = url.searchParams.get('id');

    if (!id) {
        return response(res, 'User ID required', 400);
    }

    try {
        const db = Database.getInstance();
        const [user] = await db.query(`SELECT * FROM user_table WHERE id = ${id}`);

        if (!user) {
            return response(res, 'User not found', 404);
        }

        //Render template with user data
        return response(res, view('admin/viewProfile', user), 200)
    } catch (error) {
        console.error(error);
        return response(res, 'Error fetching user', 500)
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await Users.get()
    return responseJson(res, 200, users);
}

