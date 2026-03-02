const { response } = require("../../common/response");
const view = require("../../common/view");
const Carts = require("../../models/CartModel");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const Users = require("../../models/UserModel");


exports.renderCustomerMedicines = async (req, res) => {

    try {
        const search = req.params.get('search');
        const customer = (await Users.getById(req.customerId))[0];
        let medicines = await Medicines.query("select * from this.table where id > 0  " + (search ? ` and geneticName like "${"%" + Array.from(search).join("%") + "%"}" limit 10` : "limit 10"));
        const pharmacies = await Pharmacies.query("select * from this.table where id > 0  " + (search ? ` and town like "${"%" + Array.from(search).join("%") + "%"}" ` : "") + " limit 10");


        console.log("select * from this.table where id > 0  " + (search ? ` and name like "${"%" + Array.from(search).join("%") + "%"}" ` : "") + (search ? ` and name like "${"%" + Array.from(search).join("%") + "%"}" ` : "") + " limit 10");

        medicines = await Promise.all(medicines.map((async m => {
            const [c] = await Carts.get({
                userId: customer.id,
                medicineId: m.id,
            });

            const av = await PharmacyMedicines.get({
                medicineId : m.id,
            });

            if (c) {
                m.card = true;
            } else {
                m.card = false;
            }

            if(av.length){
                m.available = true;
            }else{
                m.available = false;
            }

            return m;
        })))


        if (!customer) return view('404');
        return response(res, view('customer/customer.medicines.view', {
            ...customer,
            header: view('component.header', {
                name: "Search Medicines",
            }),

            value: search ? search : "",
            customerId: customer.id,
            verified: !customer.verified ? view("components/component.unverified", {
                verificationpage: `/verify/${customer.id}/email`
            }) : "",
            medicines: medicines.length ? medicines.map(m => view('customer/component.search.view.card', {
                ...m,
                name: m.geneticName,
                img: m.image,
                status : m.available ? "available at pharmanet" : "not available",
                status_class :m.available ? "available" : "not-available",
                link :  `/customers/${customer.id}/medicines/${m.id}`,
                cta: m.card ? 'already added' : 'add to card',
                cta_class: m.card ? "added medicine" : 'medicine',
            })).join(' ') : `"${search}" not available any medicine for this`,
            pharmacies: pharmacies.map(p => view('customer/component.search.view.card', {
                ...p,
                name: p.name,
                img: p.img,
                cta: 'view'
            })).join(' '),
            count: medicines.length,
            navbar: view('customer/navbar.customer', customer),
            footer: view('footer'),
            cart: view('customer/component.cart'),
            results: medicines.map(medicine => view('customer/medicine.search.card', medicine)).join(' ')
        }), 200)


    } catch (error) {
        console.log(error);
        response(res, view('404'), 400);
    }


}
exports.renderCustomerSelectedMedicine = async (req, res) => {
    try {
        const [medicine] = await Medicines.getById(req.medicineId);
        const [customer] = await Users.getById(req.customerId);


        return response(res, view("customer/customer.medicine.blog", {
            header: view('component.header', {
                name: medicine.geneticName,
            }),
            navbar: view('customer/navbar.customer', customer),
            footer: view('footer'),
            ...medicine,
            cart: view('customer/component.cart'),
        }), 200);
    } catch (e) {
        console.log(e);
        return response(res, view('404'), 404);
    }
}





