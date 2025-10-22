const Bridge = require("../common/Bridge");
const view = require("./../common/view");
const { getRequestData } = require("../common/getRequestData");



// ✅ Render admin pharmacy management page (list all pharmacies)
exports.renderAdminPharmacyPage = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PHARMACY_SERVICE, {
            method: "GET",
        })
        .request(async (req, res) => {
            return await getRequestData(req);
        })
        .json()
        .resend((data) => {
            // Render pharmacy admin page with retrieved data
            return view("admin.pharmacy.verify", {
                pharmacies: data || [],
                adminId : req.adminId,
            });
        }, 200);
};

// ✅ Create a new pharmacy
exports.createPharmacy = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PHARMACY_SERVICE, {
            method: "POST",
        })
        .request(async (req, res) => {
            const pharmacyData = await getRequestData(req);
            return pharmacyData;
        })
        .json()
        .resend((data) => {
            return view("admin.pharmacies.manage", {
                message: "Pharmacy created successfully",
                data,
            });
        }, 200);
};

// ✅ Update pharmacy details
exports.updatePharmacy = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PHARMACY_SERVICE, {
            method: "PATCH",
        })
        .request(async (req, res) => {
            const pharmacyData = await getRequestData(req);
            return pharmacyData;
        })
        .json()
        .resend((data) => {
            return view("admin.pharmacies", {
                message: "Pharmacy updated successfully",
                data,
            });
        }, 200);
};

// ✅ Delete a pharmacy
exports.deletePharmacy = async (req, res) => {
    Bridge.pipe(req, res)
        .connect(Bridge.registry.PHARMACY_SERVICE, {
            method: "DELETE",
        })
        .request(async (req, res) => {
            const body = await getRequestData(req);
            return body;
        })
        .resend((data) => {
            return view("admin.pharmacies.manage", {
                message: "Pharmacy deleted successfully",
            });
        });
};

