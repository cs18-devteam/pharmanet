const { file } = require("googleapis/build/src/apis/file");
const { apiCatchAsync } = require("../../common/catchAsync");
const { validateEmail } = require("../../common/emailValidator");
const File = require("../../common/File");
const getMultipartData = require("../../common/getMultipartData");
const { getRequestData } = require("../../common/getRequestData");
const readCookies = require("../../common/readCookies");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const connectedPharmacies = require("../../memory/pharmacies.memory.temp");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Users = require("../../models/UserModel");
const { calculateDistanceKM } = require("../../common/calcDistance");


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
    const fileName = `${name}-${Date.now()}.${file.fileName.split(".").slice(-1)}`;
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
    const search = req.params.get('search');
    if (!customer) throw new Error("customer not found");
    if (!pharmacy) throw new Error("no pharmacy found");

    const pharmacyData = {
      ...pharmacy,
      contact1: pharmacy.contact,
    };

    const pharmacyStaff = await PharmacyStaff.get({
      pharmacyId : pharmacy.id,
    });


    let staff = await Promise.all(pharmacyStaff.map(async s=>{
      const [user] = await Users.getById(s.userId);
      if(!user) return undefined;

      return {image : user.profile ,role : s.role ,firstName : user.firstName , lastName : user.lastName}
    }))

    staff = staff.filter(s=>s!=undefined);

    const medicines = await PharmacyMedicines.get({
      pharmacyId: pharmacy.id,
    });

    const medicineCards = medicines.map(async (m) => {
      const [medicine] = await Medicines.getById(m.medicineId);
      if(!medicine) return undefined;
      if (search) {
        if (!medicine?.geneticName.toLowerCase().includes(search) && !medicine.category?.toLowerCase().includes(search)) {
          return undefined;
        }
      }


      return view("customer/component.medicine.card", {
        id: m.medicineId,
        price: m.price,
        stock: Number(m.publicStock).toLocaleString('si-LK'),
        status: m.publicStock <= 0 ? "low" : "",
        userId : customer.id,
        name: medicine.geneticName,
        image: medicine.image,
        medicineId: m.medicineId,
      });
    });

    let medicineCardsText = await Promise.all(medicineCards);
    medicineCardsText = medicineCardsText.filter(t => t != undefined);
    if(!medicineCardsText.length){

      if(search){
        medicineCardsText.push(`<div style="position: absolute; left: 50% ; transform : translateX(-50%) ;text-align: center;color: #555; font-size : 3rem;">"${search}" Not found any Medicine</div>`);
      }else{
        medicineCardsText.push(`<div style="position: absolute; left: 50% ; transform : translateX(-50%) ;text-align: center;color: #555; font-size : 3rem;">No medicines in Stock</div>`)
      }
    }

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
        status: connectedPharmacies[pharmacy.id] ? "online" : "offline",
        footer: view('footer'),
        contact : pharmacy.contact || "+00 000 0000 000",
        image: `'${pharmacy.img}'`,
        staff : staff.map(s=>`<div class="owner">
          <img src="${s.image}" alt="${s.role}">
          <div class="title">${s.role}</div>
          <div class="owner-name">${s.firstName} ${s.lastName}</div>
        </div>`).join(' '),

        // {...pharmacy , contact1 : pharmacy.contact , contact2 : ""}
      }),
      200,
    );
  } catch (error) {
    console.log(error);
    response(res, view("404"), 400);
  }
};

exports.createPharmacy = apiCatchAsync(async (req, res) => {
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

  const contactNumber = (pharmacyData.contactNumber || "").trim();
  if (!contactNumber) {
    await Pharmacies.query("rollback");
    return responseJson(res, 400, {
      status: "error",
      message: "contact number is required",
      field: "contactNumber",
    });
  }
  if (!/^\d{10}$/.test(contactNumber)) {
    await Pharmacies.query("rollback");
    return responseJson(res, 400, {
      status: "error",
      message: "contact number must be a 10-digit number",
      field: "contactNumber",
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
    !(
      googleMapLink.startsWith("https://maps.app.goo.gl") ||
      googleMapLink.startsWith("https://goo.gl/maps")
    )
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

  const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  const maxFileSizeBytes = 5 * 1024 * 1024; // 5MB

  function validateUpload(file, fieldName, label) {
    // Must be parsed as your custom File object from getMultipartData
    if (!(file instanceof File)) {
      return {
        status: "error",
        message: `${label} is required`,
        field: fieldName,
      };
    }

    // Empty filename means user did not really select a file
    if (!file.fileName || !file.fileName.trim()) {
      return {
        status: "error",
        message: `${label} is required`,
        field: fieldName,
      };
    }

    // Restrict file type
    if (!allowedMimeTypes.includes((file.mimeType || "").toLowerCase())) {
      return {
        status: "error",
        message: `${label} must be PDF, JPG, or PNG`,
        field: fieldName,
      };
    }

    // File content checks (Buffer in your implementation)
    const fileSize = Buffer.isBuffer(file.content)
      ? file.content.length
      : (file.content || "").length;

    if (!fileSize) {
      return {
        status: "error",
        message: `${label} is empty or invalid`,
        field: fieldName,
      };
    }

    if (fileSize > maxFileSizeBytes) {
      return {
        status: "error",
        message: `${label} must be less than 5MB`,
        field: fieldName,
      };
    }

    return null;
  }

  const documentChecks = [
    {
      file: pharmacyData.registrationDoc,
      field: "registrationDoc",
      label: "Registration document",
    },
    {
      file: pharmacyData.ownerDoc,
      field: "ownerDoc",
      label: "Owner document",
    },
    {
      file: pharmacyData.addressDoc,
      field: "addressDoc",
      label: "Address proof document",
    },
  ];

  for (const doc of documentChecks) {
    const validationResult = validateUpload(doc.file, doc.field, doc.label);
    if (validationResult) {
      await Pharmacies.query("rollback");
      return responseJson(res, 400, validationResult);
    }
  }

  //validate of pharamacy image if user upload image
  const imageAllowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  const imageMaxFileSizeBytes = 5 * 1024 * 1024; // 5MB

  if (
    !(pharmacyData.image instanceof File) ||
    !pharmacyData.image.fileName?.trim()
  ) {
    await Pharmacies.query("rollback");
    return responseJson(res, 400, {
      status: "error",
      message: "Pharmacy image is required",
      field: "image",
    });
  }

  const imageMimeType = (pharmacyData.image.mimeType || "").toLowerCase();
  const imageSize = Buffer.isBuffer(pharmacyData.image.content)
    ? pharmacyData.image.content.length
    : (pharmacyData.image.content || "").length;

  if (!imageAllowedMimeTypes.includes(imageMimeType)) {
    await Pharmacies.query("rollback");
    return responseJson(res, 400, {
      status: "error",
      message: "Pharmacy image must be JPG, JPEG, or PNG",
      field: "image",
    });
  }

  if (!imageSize || imageSize <= 0) {
    await Pharmacies.query("rollback");
    return responseJson(res, 400, {
      status: "error",
      message: "Pharmacy image is empty or invalid",
      field: "image",
    });
  }

  if (imageSize > imageMaxFileSizeBytes) {
    await Pharmacies.query("rollback");
    return responseJson(res, 400, {
      status: "error",
      message: "Pharmacy image must be less than 5MB",
      field: "image",
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
    contact: pharmacyData.contactNumber,
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
  }else{
    throw new Error("registration document not found")
  }

  if (pharmacyData.ownerDoc instanceof File) {
    const file = await saveFile(
      pharmacyData.name,
      pharmacyData.ownerDoc,
      "/pharmacyOwners",
    );
    pharmacyObj.ownerDoc = file.destination;
  }else{
    throw new Error("owner identification doc not found");
  }


  if (pharmacyData.addressDoc instanceof File) {
    const file = await saveFile(
      pharmacyData.name,
      pharmacyData.addressDoc,
      "/pharmacyOwners",
    );
    pharmacyObj.addressDoc = file.destination;
  }else{
    throw new Error("address verification document not found");
  }

  if (pharmacyData.image instanceof File) {
    const file = await saveFile(
      pharmacyData.name,
      pharmacyData.image,
      "/pharmacyImages",
    );
    pharmacyObj.img = file.destination;
  }else{
    throw new Error("pharmacy profile image not found");
  }


  const [pharmacy] = await Pharmacies.save(pharmacyObj);

  //create pharmacist
  const [pharmacist] = await PharmacyStaff.save({
    role: "pharmacist",
    userId: customer.id,
    pharmacyId: pharmacy.id,
    createOrder: 1,
    deleteOrder: 1,
    readOrder: 1,
    updateOrder: 1,
    readTransactions: 1,
    searchProducts: 1,
    updateProducts: 1,
    deleteProducts: 1,
    createProducts: 1,
    searchMedicines: 1,
    createMedicines: 1,
    deleteMedicines: 1,
    updateMedicines: 1,
    searchStaff: 1,
    updateStaff: 1,
    deleteStaff: 1,
    createStaff: 1,
  });

  const updateResult = await Users.update({
    id: customer.id,
    role: "pharmacist",
  });


  await Pharmacies.update({
    id: pharmacy.id,
    ownerId : pharmacist.id, 
  })

  return responseJson(res, 200, {
    status: "success",
    results: {
      ...pharmacy,
      pharmacist,
    },
  });
});




exports.getNearByPharmacies = apiCatchAsync(async (req , res)=>{
  const distance = req.params.get('distance');
  const {latitude , longitude} = readCookies(req);

  let pharmacies = [];
  for(const [id , phrClient] of Object.entries(connectedPharmacies)){
    const [pharmacy] = await Pharmacies.getById(id);
    if(!pharmacy) continue;

    if(latitude && longitude){
      const dis = calculateDistanceKM(latitude , longitude , pharmacy.latitude , pharmacy.longitude);
      pharmacy.distance = dis;

      if(distance){
        if(distance < dis) continue;
      }
    }

    pharmacies.push(pharmacy);
  }


  responseJson(res , 200 , {
    status:"success",
    data : pharmacies,
  })
})