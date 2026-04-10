const { catchAsync } = require("../../common/catchAsync");
const { response } = require("../../common/response");
const view = require("../../common/view");
const LoyaltyPoints = require("../../models/LoyaltyPointModel");
const Pharmacies = require("../../models/PharmacyModel");
const Users = require("../../models/UserModel");


exports.LoyaltyPoints = catchAsync(async (req, res) => {
  const customer = await Users.get(req.CustomerId)[0];
  if (!customer)
    return view("404", {
      header,
    });
});

exports.renderLoyaltyPoints = catchAsync(async (req, res) => {
  const customer = (await Users.getById(req.customerId))[0];
  if (!customer) return response(res, "your are not authorized", 302);

  const loyaltypoints = (await LoyaltyPoints.get({
    customerId : req.customerId
  }))

  let total = 0;
  loyaltypoints.forEach(p=>{
    total += p.LoyaltyPoints;
  })


  return (
    response(
      res,
      view("customer/customer.loyaltyPoints", {
        ...customer,
        navbar: view("customer/navbar.customer", customer),
        header: view("component.header", {
          name: "medicine view",
        }),
        row: (await Promise.all(loyaltypoints.map(async (r) => {


            const pharmacy = (await  Pharmacies.getById(r.PharmacyId))[0];
            console.log(pharmacy)



           return `<div class="row">
                <a href="#">${pharmacy?.name}</a>
                <span>${r.LoyaltyPoints} Points</span>
            </div>`
        }))).join(' '),
        cart: view("customer/component.cart"),
        footer: view("footer"),
        total ,
      }),
    ),
    200
  );
});
