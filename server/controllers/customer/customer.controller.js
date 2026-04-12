const { createCookie } = require("../../common/Auth");
const Bridge = require("../../common/Bridge");
const { catchAsync } = require("../../common/catchAsync");
const { response } = require("../../common/response");
const view = require("../../common/view");
const Medicines = require("../../models/MedicineModel");
const Pharmacies = require("../../models/PharmacyModel");
const PharmacyOrdersItems = require("../../models/PharmacyOrderItemsModel");
const PharmacyOrders = require("../../models/PharmacyOrderModel");
const PharmacyStaff = require("../../models/PharmacyStaffModel");
const Transactions = require("../../models/TransactionModel");
const Users = require("../../models/UserModel");


exports.renderCustomerHome = async (req, res) => {
        try {
                const customer = (await Users.getById(req.customerId))[0];


                if (!customer) throw new Error("customer not found");

                const [staffMember] = await PharmacyStaff.get({ userId: customer.id });
                const [{ count: medicineCount }] = await Medicines.query('select count(*) as count from this.table');
                const [{ count: pharmacyCount }] = await Pharmacies.query('select count(*) as count from this.table where status = 1');
                console.log({ customer, staffMember });
                const range = Number.parseInt(Math.random() * (medicineCount - 12));
                console.log(range);
                const medicine = await Medicines.query(`select * from this.table where ${0} < id limit 12`);

                console.log(medicine);



                if (!staffMember) {
                        return response(res, view('customer/customer.home', {
                                ...customer,
                                verified: !customer.verified ? view("components/component.unverified", {
                                        verificationpage: `/verify/${customer.id}/email`
                                }) : "",
                                navbar: view('customer/navbar.customer', customer),
                                header: view('component.header', {
                                        name: "Pharmanet || Home",
                                }),
                                footer: view('footer'),
                                cart: view('customer/component.cart'),
                                MedicineCount: medicineCount,
                                PharmacyCount: pharmacyCount,
                                medicineCards: medicine.map(m => view('customer/component.home.medicine.card', {
                                        name: m.geneticName,
                                        image: m.image,
                                        id: m.id,
                                })).join(' ')
                        }), 200)
                } else {
                        return response(res, 'redirect', 301, {
                                location: `/pharmacies/${staffMember.pharmacyId}/staff/${staffMember.id}`,
                                "Set-Cookie": `staffId=${staffMember.id};expires=${Date.now() + 300};path="/"`
                        })
                }
        } catch (e) {
                console.log(e);
                return response(res, view('404'), 404);
        }

}

exports.renderCustomerProfile = async (req, res) => {
        try {

                const customer = (await Users.getById(req.customerId))[0];
                if (!customer) return response(res, "your are not authorized", 302);


                return response(res, view('customer/profile', {
                        header: view('component.header', {
                                name: `${customer?.firstName} ${customer?.lastName} || Account Setting`,
                        }),
                        navbar: view('customer/navbar.customer', {
                                name: `${customer?.firstName} ${customer?.lastName}`
                        }),
                        footer: view('footer'),
                        cart: view('customer/component.cart'),
                        ...customer,
                        address: !(customer.addressNo || customer.street || customer.town || customer.province) ?
                                `<button class="address_add_button"> + Add Your address</button>`
                                :
                                `<input type="text" value="${customer.addressNo == "unknown" ? "-" : customer.addressNo}" disabled class="update-field update-field_no"><Br>
                        <input type="text" value="${customer.street == "unknown" ? "-" : customer.street}" disabled class="update-field update-field_street"><br>
                        <input type="text" value="${customer.town == "unknown" ? "-" : customer.town}" disabled class="update-field update-field_town"><br>
                        <input type="text" value="${customer.province == "unknown" ? "-" : customer.province}" disabled class="update-field update-field_province"><br>`,
                }), 200);
        } catch (e) {
                console.log(e);
                return response(res, view('404'), 404);
        }
}

//new adding to medicine view
exports.renderPharmacyView = async (req, res) => {

        return response(res, view('customer/customer.medicine.review', {
                navbar: view('customer/navbar.customer', {}),
                header: view('component.header', {
                        name: "medicine view",
                }),
                cart: view('customer/component.cart'),
        }), 200)
}




exports.renderCustomerOrders = catchAsync(async (req, res) => {

        const customer = (await Users.getById(req.customerId))[0];
        if (!customer) return response(res, "your are not authorized", 302);

        let orders = await PharmacyOrders.get({
                userId: customer.id,
        })

        orders = orders.sort((a, b) => b.id - a.id);
        orders = orders.filter(o => o.pharmacyId);

        garbageOrders = orders.filter(o => !o.pharmacyId);
        garbageOrders.map(o => {
                PharmacyOrders.deleteById(o.id);
        })


        orders = await Promise.all(orders.map(async o => {
                if (o.pharmacyId) {
                        const [pharmacy] = await Pharmacies.getById(o.pharmacyId);
                        o.pharmacy = pharmacy || undefined;
                } else {
                        o.pharmacy = undefined;
                }

                const [transaction] = await Transactions.get({
                        orderId: o.id,
                })

                let items = await PharmacyOrdersItems.get({
                        orderId: o.id,
                })

                const summery = {
                        price: 0,
                        discount: 0,
                        loyalty: 0,
                        total: 0,
                }
                items = await Promise.all(items.map(async i => {
                        if (i.itemType == "medicine") {
                                i.details = (await Medicines.getById(i.itemId))[0];
                        }

                        summery.price += i.price * i.quantity;
                        summery.discount + - i.discount;
                        summery.total = summery.price - summery.discount - summery.loyalty;
                        return i
                }))





                o.summery = summery;
                o.items = items;

                o.transaction = transaction || undefined;
                return o;
        }))





        return response(res, view('customer/customer.orders.history', {
                ...customer,
                navbar: view('customer/navbar.customer', customer),
                header: view('component.header', {
                        name: "medicine view",

                }),
                orders: orders.length ? (orders.map(o => view("customer/component.order.card", {
                        ...o,
                        pharmacy: o.pharmacy ? o.pharmacy.name || "can't find name" : " No pharmacy Involved ",
                        pharmacist: o.pharmacy ? o.pharmacy.pharmacist || "No Pharmacist" : " No pharmacy Involved ",
                        pharmacyId: o.pharmacy ? o.pharmacy.id || "000" : "000",
                        status: o.transaction ? "Paid" : "Pending",
                        createdAt: o.createdAt ? new Date(o.createdAt) : "Date not available",
                        items: o.items.map(i => ` 
                        <div class="product ${i.itemType}">
                                <span>${(i.itemType == "medicine" ? "M" : "P") + i.itemId}</span>
                                <a href="/customers/${customer.id}/${i.itemType == "medicine" ? "medicines" : "products"}/${i.itemId}"><span style="color: #1A7F78;"><u>${i?.details?.name?.slice(0, 50) || i?.details?.geneticName?.slice(0, 50) || "Name is not available"}</u></span></a>
                                <p>Rs: ${i.price?.toFixed(2)}</p>
                                <p>X</p>
                                <p>${i.quantity} units</p>
                                <p class="price">Rs ${(i.price * i.quantity)?.toFixed(2)}</p>
                                </div>
                        `).join(' '),
                        price: o.summery.price,
                        total: o.summery.total,
                        discount: o.summery.discount,
                        loyalty: o.summery.loyalty,

                })).join(' ')) : view("components/component.404", {
                        message: "Look like still no orders",
                        text: "go and make order",
                }),
                cart: view('customer/component.cart'),
                footer: view('footer'),

        })), 200
})

