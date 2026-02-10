const { catchAsync } = require("../../common/catchAsync");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Pharmacies = require("../../models/PharmacyModel");
const Medicines = require("../../models/MedicineModel");
const Users = require("../../models/UserModel");
const ActivityLogService = require("../../../services/activityLogService/activityLogService");

exports.renderAdminDashboard = catchAsync(async (req, res) => {
  try {
    const [admin] = await Pharmacies.getById(req.adminId);

    return response(
      res,
      view("admin/adminDashboard", {
        header: view("component.header", {
          name: "Dashboard || Pharmanet Admin",
        }),
        sidebar: view("admin/component.sidebar", admin),
      }),
      200
    );
  } catch (e) {
    console.log(e);
    return response(res, "Error loading dashboard", 500);
  }
});

exports.sendDashboardStats = catchAsync(async (req, res) => {
  try {
    const pharmacies = await Pharmacies.get();
    const totalPharmacies = pharmacies.length;

    const medicines = await Medicines.get();
    const totalMedicines = medicines.length;

    const users = await Users.get();
    const totalUsers = users.length;

    //Count medicines by category
    const categoryCounts = {};
    medicines.forEach((med) => {
      const category = med.category || "other";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    return responseJson(res, 200, {
      totalPharmacies,
      totalMedicines,
      totalUsers,
      medicinesByCategory: categoryCounts,
    });
  } catch (e) {
    console.log(e);
    return responseJson(res, 500, {
      error: "Failed to fetch dashboard statistics",
    });
  }
});

// Add this new export for getting activities
exports.sendRecentActivities = catchAsync(async (req, res) => {
  try {
    const activities = await ActivityLogService.getRecentActivities(5);

    return responseJson(res, 200, 
      {activities: activities || []},
      {"Cache-Control" : "no-store"}
    );
  } catch (e) {
    console.log(e);
    return responseJson(res, 500, {
      error: "Failed to fetch activities",
    });
  }
});
