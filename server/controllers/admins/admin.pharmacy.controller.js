const { catchAsync } = require("../../common/catchAsync");
const { getRequestData } = require("../../common/getRequestData");
const { responseJson, response } = require("../../common/response");
const view = require("../../common/view");
const Pharmacies = require("../../models/PharmacyModel");
const ActivityLogService = require("../../../services/activityLogService/activityLogService");
const Users = require("../../models/UserModel");

exports.renderAllPharmacies = catchAsync(async (req, res) => {
  const pharmacies = await Pharmacies.get();
  const [admin] = await Users.getById(req.adminId);


  return response(
    res,
    view("admin/pharmacy", {
      header: view("component.header", {
        name: "Pharmacies || Pharmanet Pharmacy Management",
      }),
      sidebar: view("admin/component.sidebar", admin),
      rows: pharmacies
        .map((p) => view("admin/component.pharmacy.row", p))
        .join(" "),
    }),
    200
  );
});

exports.createPharmacy = async (req, res) => {
  let sent = false;
  let adminId = req.adminId;

  // Fallback: extract from URL if not in req
  if (!adminId && req.url) {
    const parts = req.url.split("/");
    // Assuming /admin/:id/blogs/create -> id is index 2 (empty, admin, id, ...)
    if (parts[1] === "admin" && parts[2]) {
      adminId = parts[2];
    }
  }

  // Validation: Ensure adminId is valid (e.g., numeric)
  if (!adminId || isNaN(adminId)) {
    console.error(`Invalid or missing adminId: ${adminId}`);
    return response(res, "Invalid Admin ID", 400);
  }

  try {
    const {
      name,
      licenseNumber,
      email,
      addressNo,
      street,
      town,
      province,
      latitude,
      longitude,
      googleMapLink,
      contact,
      postalCode,
      pharmacist,
      type,
    } = JSON.parse(await getRequestData(req));

    //const search for duplicate email
    const pharmacy = await Pharmacies.get({ email, email });
    if (pharmacy.length > 0) {
      console.log("duplicate pharmacy email");
      return responseJson(res, 400, {
        status: "error",
        message: "duplicate email address",
        field: "email",
      });
    }

    console.log(name);

    const results = await Pharmacies.save({
      name,
      licenseNumber,
      email,
      addressNo,
      street,
      town,
      province,
      latitude,
      longitude,
      googleMapLink,
      contact,
      postalCode,
      pharmacist,
      type,
    });

    // LOG THE ACTIVITY - Add this line
    await ActivityLogService.logActivity(
      adminId, // WHO did it
      "CREATE", // ACTION
      "pharmacy", // CATEGORY
      "Added new pharmacy", // DESCRIPTION
      name, // ENTITY NAME (pharmacy name)
      results.insertId // ENTITY ID
    );

    return responseJson(res, 201, results);
  } catch (e) {
    console.log(e);
    return (
      !sent &&
      response(
        res,
        200,
        JSON.stringify({
          status: "error",
          error: e,
        })
      )
    );
  }
};

exports.updatePharmacy = async (req, res) => {
  

  try {
    const data = JSON.parse(await getRequestData(req));
    const updatedPharmacy = await Pharmacies.update(data);
    return (sent = true && response(res, JSON.stringify(updatedPharmacy), 201));
  } catch (e) {
    console.log(e);
    return (
      !sent &&
      response(res,400,
        {
          status: "error",
          error: e.message|| String(e)
        }
      )
    );
  }
};

exports.sendJsonPharmaciesList = async (req, res) => {
  try {
    const allPharmacies = await Pharmacies.get();
    return response(res, JSON.stringify(allPharmacies), 200);
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};

exports.renderPharmacyDetailsView = async (req, res) => {
  try {
    if (req.pharmacyId) {
      const pharmacy = await Pharmacies.getById(req.pharmacyId);

      if (!pharmacy) {
        return response(
          res,
          '<script>window.location.href="/admin/pharmacy"</script>'
        );
      }

      return response(res, view("admin/pharmacy.details", pharmacy[0]), 200);
    } else {
      return response(res, JSON.stringify({}), 200);
    }
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};

exports.renderPharmacyView = async (req, res) => {
  try{
    
    const [users] = await Users.getById(req.pharmacyId);
    console.log(users);

    return response(res, view("admin/viewPharmacy" , { users:JSON.stringify(users) }), 200);

  }catch(e){
    console.log(e);
    return response(res, JSON.stringify({}), 400)
  }
}

exports.deletePharmacy = async (req, res) => {
  try {
    console.log({ pharmacyId: req.pharmacyId });
    if (req.pharmacyId) {
      const deleteLog = await Pharmacies.deleteById(req.pharmacyId);

      // LOG THE ACTIVITY - Add this line
      await ActivityLogService.logActivity(
        adminId, // WHO did it
        "Delete", // ACTION
        "pharmacy", // CATEGORY
        "Deleted pharmacy", // DESCRIPTION
        name, // ENTITY NAME (pharmacy name)
        results.insertId // ENTITY ID
      );

      return response(
        res,
        JSON.stringify({
          status: "success",
        }),
        204
      );
    } else {
      return response(res, JSON.stringify({}), 200);
    }
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};

exports.renderAdminCreatePharmacyViewStep01 = catchAsync(async (req, res) => {
  return response(
    res,
    view("admin/addPharmacy", {
      header: view("component.header", {
        name: "Add new Pharmacy | step 01",
      }),
      next: "/admin/:adminId/pharmacies/create/step/2",
    }),
    200
  );
});
exports.renderAdminCreatePharmacyViewStep02 = catchAsync(async (req, res) => {
  return response(
    res,
    view("admin/addPharmacy-step2", {
      header: view("component.header", {
        name: "Add new Pharmacy | step 02",
      }),
      next: "/admin/:adminId/pharmacies/step/3",
      previous: "/admin/:adminId/pharmacies/create",
    }),
    200
  );
});
exports.renderAdminCreatePharmacyViewStep03 = catchAsync(async (req, res) => {
  return response(
    res,
    view("admin/addPharmacy-step3", {
      header: view("component.header", {
        name: "Add new Pharmacy | step 03",
      }),
      next: "/admin/:adminId/pharmacies/step/4",
      previous: "/admin/:adminId/pharmacies/step/2",
    }),
    200
  );
});
exports.renderAdminCreatePharmacyViewStep04 = catchAsync(async (req, res) => {
  return response(
    res,
    view("admin/addPharmacy-step4", {
      header: view("component.header", {
        name: "Add new Pharmacy | step 04",
      }),
      previous: "/admin/:adminId/pharmacies/step/3",
      next: "/admin/:adminId/pharmacies",
    }),
    200
  );
});

exports.renderAdminEditPharmacyViewStep01 = async (req, res) => {
  try {
    if (req.pharmacyId) {
      const [pharmacy] = await Pharmacies.getById(req.pharmacyId);

      return response(
        res,
        view("admin/editPharmacy", {
          header: view("component.header", {
            name: "Edit Pharmacy | step 01",
          }),
          sidebar: view("admin/component.sidebar"),
          ...pharmacy,
        }),
        200
      );
    } else {
      return response(res, JSON.stringify({}), 200);
    }
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};
exports.renderAdminEditPharmacyViewStep02 = async (req, res) => {
  try {
    if (req.pharmacyId) {
      const pharmacy = await Pharmacies.getById(req.pharmacyId);

      return response(
        res,
        view("admin/editPharmacy-step2", {
          header: view("component.header", {
            name: "Edit Pharmacy | step 02",
          }),
          ...pharmacy[0],
        }),
        200
      );
    } else {
      return response(res, JSON.stringify({}), 200);
    }
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};
exports.renderAdminEditPharmacyViewStep03 = async (req, res) => {
  try {
    if (req.pharmacyId) {
      const pharmacy = await Pharmacies.getById(req.pharmacyId);
      return response(
        res,
        view("admin/editPharmacy-step3", {
          header: view("component.header", {
            name: "Edit Pharmacy | step 03",
          }),
          ...pharmacy[0],
        }),
        200
      );
    } else {
      return response(res, JSON.stringify({}), 200);
    }
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};
exports.renderAdminEditPharmacyViewStep04 = async (req, res) => {
  try {
    if (req.pharmacyId) {
      const [pharmacy] = await Pharmacies.getById(req.pharmacyId);

      return response(
        res,
        view("admin/editPharmacy-step4", {
          header: view("component.header", {
            name: "Edit Pharmacy | step 04",
          }),
          id: pharmacy.id,
          ...pharmacy,
        }),
        200
      );
    } else {
      return response(res, JSON.stringify({}), 200);
    }
  } catch (e) {
    console.log(e);
    return response(res, JSON.stringify(e), 400);
  }
};
