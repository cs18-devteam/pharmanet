const Users = require("../../models/UserModel");
const Bridge = require("../../common/Bridge");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const { getRequestData } = require("../../common/getRequestData");

exports.renderCustomerProfile = async (req, res) => {
  try {
    const customer = await Users.get(req.customerId)[0];
    if (!customer)
      return view("404", {
        header: view("component.header", {
          name: "Antibiotics",
        }),
        navbar: view("components/navbar.customer", {
          name: `${customer?.firstName} ${customer?.lastName}`,
        }),
        footer: view("footer"),
        cart: view("customer/component.cart"),
      });

    for (const [key, value] of Object.entries(customer)) {
      if (!value) {
        customer[key] = " ";
      }
    }

    return view("customer.profile", {
      header: view("component.header", {
        name: `${customer.firstName} ${customer.lastName} || Account - Pharmanet`,
      }),
      navbar: view("components/navbar.customer", {
        name: `${customer?.firstName} ${customer?.lastName}`,
      }),
      ...customer,
      role: "Customer",
      mobileNumber: " ",
      cart: view("customer/component.cart"),
    });
  } catch (e) {
    console.log(e);
    return response(res, view("404"), 404);
  }
};

//update customer profile
exports.updateCustomerProfile = async (req, res) => {
  console.log("Update controller hit");
  try {
    const bodyString = await getRequestData(req);
    const body = bodyString ? JSON.parse(bodyString) : {};

    const customerId =
      req.customerId || req.userId || req.user?.id || req.params.userId;

    console.log("customer id", customerId);
    console.log("Params ID:", req.params.userId);
    console.log("Body:", body);

    const updateData = {
      id: Number(customerId),
      firstName: body.firstName,
      lastName: body.lastName,
      addressNo: body.addressNo,
      street: body.street,
      town: body.town,
      province: body.province,
      postalCode: body.postalCode,
      bank: body.bank,
      accountNo: body.accountNo,
      bankBranch: body.bankBranch,
    };

    //lets clean undefined values

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    await Users.update(updateData);

    return responseJson(res, 200, {
      success: true,
      message: "Customer profile updated successfully",
    });
  } catch (e) {
    console.log(e);
    return responseJson(res, 500, {
      success: false,
      message: "Failed to update customer profile",
    });
  }
};

exports.deleteCustomerProfile = async (req, res) => {
  try {
    const customerId =
      req.customerId || req.userId || req.user?.id || req.params.userId;

    await Users.deleteById(customerId);

    return responseJson(res, 200, {
      success: true,
      message: "Customer account deleted successfully",
    });
  } catch (e) {
    console.log(e);
    return responseJson(res, 500, {
      success: false,
      message: "Failed to delete customer account",
    });
  }
};
