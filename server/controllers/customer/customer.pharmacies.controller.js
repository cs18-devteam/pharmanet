const { validateEmail } = require("../../common/emailValidator");
const File = require("../../common/File");
const getMultipartData = require("../../common/getMultipartData");
const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");

function calculateDistanceKM(clientLat, clientLng, pharmacyLat, pharmacyLng) {
  const R = 6371; // Earth radius in kilometers

  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(pharmacyLat - clientLat);
  const dLng = toRad(pharmacyLng - clientLng);

  const lat1 = toRad(clientLat);
  const lat2 = toRad(pharmacyLat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in KM
}

exports.renderCustomerPharmacies = async (req, res) => {
  try {
    const [customer] = await Users.getById(req.customerId);
    const pharmacies = await Pharmacies.get();
    const latitude = req.params.get("latitude");
    const longitude = req.params.get("longitude");

    if (!customer) return view("404");
    return response(
      res,
      view("customer/customer.pharmacies.view", {
        header: view("component.header", {
          name: "Pharmacies",
        }),
        ...customer,
        count: pharmacies.length,
        navbar: view("customer/navbar.customer", customer),
        footer: view("footer"),
        pharmacies: pharmacies
          .map((pharmacy) =>
            view("customer/component.pharmacy.card", {
              ...pharmacy,
              distance:
                latitude && longitude
                  ? calculateDistanceKM(
                      latitude,
                      longitude,
                      pharmacy.latitude,
                      pharmacy.longitude,
                    ).toFixed(1)
                  : "not available",
              customerId: customer.id,
            }),
          )
          .join(" "),
        cart: view("customer/component.cart"),
        nearByPharmacyCards: "",
      }),
      200,
    );
  } catch (error) {
    console.log(error);
    response(
      res,
      view("404", {
        header: view("component.header", {
          name: "Antibiotics",
        }),
      }),
      400,
    );
  }
};

async function saveFile(name, file, destination) {
  try {
    const fileName = `${name}-${Date.now()}-${file.fileName}`;
    file.rename(fileName);
    const regSaveData = await file.save(destination);
    if (regSaveData.status == "success") {
      regSaveData.destination = destination + "/" + fileName;
      return regSaveData;
    } else {
      throw new Error("address proof file cannot saved");
    }
  } catch (e) {
    throw e;
  }
}

exports.renderCustomerPharmacy = async (req, res) => {
  try {
    const customer = (await Users.getById(req.customerId))[0];
    const [pharmacy] = await Pharmacies.getById(req.pharmacyId);

    if (!customer) return view("404");
    return response(
      res,
      view("pharmacy/pharmacy.profile", {
        ...customer,
        ...pharmacy,
        navbar: view("customer/navbar.customer", customer),
        customerId: customer.id,
        cart: view("customer/component.cart"),
      }),
      200,
    );
  } catch (error) {
    console.log(error);
    response(res, view("404"), 400);
  }
};

exports.renderPharmacyLandingPage = async (req, res) => {
  try {
    const [pharmacy] = await Pharmacies.getById(req.pharmacyId);
    const [customer] = await Users.getById(req.customerId);
    if (!customer) throw new Error("customer not found");
    if (!pharmacy) throw new Error("no pharmacy found");

    const pharmacyData = {
      ...pharmacy,
      contact1: pharmacy.contact,
      contact2: "****",
    };

    const medicines = await PharmacyMedicines.get({
      pharmacyId: pharmacy.id,
    });

    const medicineCards = medicines.map(async (m) => {
      const [medicine] = await Medicines.getById(m.medicineId);
      return view("customer/component.medicine.card", {
        id: m.id,
        price: m.price,
        publicStock: m.publicStock,
        name: medicine.geneticName,
        image: medicine.image,
      });
    });

    const medicineCardsText = await Promise.all(medicineCards);

    return response(
      res,
      view("customer/customer.pharmacy.landingPage", {
        navbar: view("customer/navbar.customer", customer),
        header: view("component.header", {
          name: "Antibiotics",
        }),
        carts: view("components/component.cart.card"),
        ...pharmacyData,
        medicineCards: medicineCardsText.join(" "),
        cart: view("customer/component.cart"),
        status: pharmacy.alive ? "online" : "offline",

        // {...pharmacy , contact1 : pharmacy.contact , contact2 : ""}
      }),
      200,
    );
  } catch (error) {
    console.log(error);
    response(res, view("404"), 400);
  }
};

exports.createPharmacy = async (req, res) => {
  await Pharmacies.query("start transaction");

  try {
    const pharmacyData = await getMultipartData(req);

    //validation name come from regisration form
    const pharmacyName = (pharmacyData.name || "").trim();

    if (!pharmacyName) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "pharmacy name is required",
        field: "name",
      });
    }

    if (pharmacyName.length < 2 || pharmacyName.length > 100) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "pharmacy name must be between 2 and 100 characters",
        field: "name",
      });
    }

    if (/[^a-zA-Z0-9\s]/.test(pharmacyName)) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "pharmacy name can only contain letters, numbers, and spaces",
        field: "name",
      });
    }

    //validation email come from regisration form
    //use common/emailValidator.js to validate email
    const emailValidation = validateEmail(pharmacyData.email);
    if (!emailValidation.valid) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: emailValidation.message,
        field: "email",
      });
    }

    //validation owner name come from regisration form
    const ownerName = (pharmacyData.owner || "").trim();
    if (!ownerName) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "owner name is required",
        field: "owner",
      });
    }

    if (/[^a-zA-Z\s]/.test(ownerName)) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "owner name can only contain letters and spaces",
        field: "owner",
      });
    }

    //validation address come from regisration form
    const addressNo = (pharmacyData.addressNo || "").trim();
    const street = (pharmacyData.street || "").trim();
    const town = (pharmacyData.town || "").trim();
    const province = (pharmacyData.province || "").trim();
    const postalCode = (pharmacyData.postalCode || "").trim();

    if (!addressNo && !street && !town && !province && !postalCode) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "address is required",
        field: "address",
      });
    }

    if (!addressNo) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "address number is required",
        field: "addressNo",
      });
    }

    if (!street) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Street is required",
        field: "street",
      });
    }

    if (!town) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Town is required",
        field: "town",
      });
    }

    if (!province) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Province is required",
        field: "province",
      });
    }

    if (!/^\d{5}$/.test(postalCode)) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Postal code must be exactly 5 digits",
        field: "postalCode",
      });
    }

    if (!postalCode) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Postal code is required",
        field: "postalCode",
      });
    }

    //validation of google map link come from regisration form
    const googleMapLink = (pharmacyData.googleMapLink || "").trim();

    if (!googleMapLink) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Google map link is required",
        field: "googleMapLink",
      });
    }

    if (
      !(googleMapLink.startsWith("https://maps.app.goo.gl") ||
      googleMapLink.startsWith("https://goo.gl/maps"))
    ) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "check your google map link",
        field: "googleMapLink",
      });
    }

    // let url;
    // try {
    //   url = new URL(googleMapLink);
    // } catch (e) {
    //   await Pharmacies.query("rollback");
    //   return responseJson(res, 400, {
    //     status: "error",
    //     message: "Invalid URL format",
    //     field: "googleMapLink",
    //   });
    // }

    //validation of rang og latitede and longitude come from regisration form
    const latitude = parseFloat(pharmacyData.latitude);
    const longitude = parseFloat(pharmacyData.longitude);

    if (!latitude) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "latitute is required",
        field: "latitude",
      });
    }

    if (isNaN(latitude) || latitude < 5.5 || latitude > 10.0) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Latitude must be a number between 5.50 and 10.00",
        field: "latitude",
      });
    }

    if (!longitude) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Longitude is required",
        field: "longitude",
      });
    }

    if (isNaN(longitude) || longitude < 79.5 || longitude > 82.0) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, {
        status: "error",
        message: "Longitude must be a number between 79.5 and 82.0",
        field: "longitude",
      });
    }

    const [customer] = await Users.getById(req.customerId);

    if (!customer) {
      throw new Error("customer is not found");
    }

    const pharmacyObj = {
      name: pharmacyData.name,
      licenseNumber: pharmacyData.licenseNumber,
      email: pharmacyData.email,
      expireDate: pharmacyData.expireDate,
      addressNo: pharmacyData.addressNo,
      street: pharmacyData.street,
      town: pharmacyData.street,
      province: pharmacyData.province,
      latitude: pharmacyData.latitude,
      longitude: pharmacyData.longitude,
      googleMapLink: pharmacyData.googleMapLink,
      contact: pharmacyData.contact,
      postalCode: pharmacyData.postalCode,
      pharmacist:
        pharmacyData.pharmacist || `${customer.firstName} ${customer.lastName}`,
      type: pharmacyData.type,
      owner: pharmacyData.owner || `${customer.firstName} ${customer.lastName}`,
      pharmacistLicense: pharmacyData.pharmacistLicense,
      registrationDoc: undefined,
      ownerDoc: undefined,
      addressDoc: undefined,
      img: "/pharmacyImages/general-pharmacy.png",
    };

    if (pharmacyData.registrationDoc instanceof File) {
      const file = await saveFile(
        pharmacyData.name,
        pharmacyData.registrationDoc,
        "/pharmacyRegistrations",
      );
      pharmacyObj.registrationDoc = file.destination;
    }
    if (pharmacyData.ownerDoc instanceof File) {
      const file = await saveFile(
        pharmacyData.name,
        pharmacyData.ownerDoc,
        "/pharmacyOwners",
      );
      pharmacyObj.ownerDoc = file.destination;
    }
    if (pharmacyData.addressDoc instanceof File) {
      const file = await saveFile(
        pharmacyData.name,
        pharmacyData.addressDoc,
        "/pharmacyOwners",
      );
      pharmacyObj.addressDoc = file.destination;
    }
    if (pharmacyData.image instanceof File) {
      const file = await saveFile(
        pharmacyData.name,
        pharmacyData.image,
        "/pharmacyImages",
      );
      pharmacyObj.img = file.destination;
    }
    const [pharmacy] = await Pharmacies.save(pharmacyObj);

    //create pharmacist
    const [pharmacist] = await PharmacyStaff.save({
      role: "pharmacist",
      userId: customer.id,
      pharmacyId: pharmacy.id,
    });

    const updateResult = await Users.update({
      id: customer.id,
      role: "pharmacist",
    });


    return responseJson(res, 200, {
      status: "success",
      results: {
        ...pharmacy,
        pharmacist,
      },
    });
  } catch (e) {
    console.log(e);
    await Pharmacies.query("rollback");
    return responseJson(res, 400, {
      status: "error",
      message: "pharmacy not created",
      error: e,
    });
  }
};
