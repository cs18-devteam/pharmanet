const { calculateDistanceKM } = require("../../common/calcDistance");
const { catchAsync } = require("../../common/catchAsync");
const readCookies = require("../../common/readCookies");
const { response } = require("../../common/response");
const view = require("../../common/view");
const connectedPharmacies = require("../../memory/pharmacies.memory.temp");
const Carts = require("../../models/CartModel");
const Medicines = require("../../models/MedicineModel");
const PharmacyMedicines = require("../../models/PharmacyMedicinesModel");
const Pharmacies = require("../../models/PharmacyModel");
const Users = require("../../models/UserModel");



exports.renderCustomerMedicines = async (req, res) => {

    try {
        const search = req.params.get('search');
        const customer = (await Users.getById(req.customerId))[0];
        let medicines = await Medicines.query(`select * from this.table where id > 0  ${search ? ` and  geneticName like "%${search}%" limit 10` : "limit 10"}`);

        const pharmacies = await Pharmacies.query(`select * from this.table where id > 0  and status = 1  ${(search ? ` and ( town like "%${Array.from(search).join("%")}%" or name like "%${Array.from(search).join("%")}%" or name="%${search}%") ` : "")} limit 10`);
        const {latitude , longitude} = readCookies(req);


        medicines = await Promise.all(medicines.map((async m => {
            const [c] = await Carts.get({
                userId: customer.id,
                medicineId: m.id,
            });

            const av = await PharmacyMedicines.get({
                medicineId: m.id,
            });

            if (c) {
                m.card = true;
            } else {
                m.card = false;
            }

            if (av.length) {
                m.available = true;
            } else {
                m.available = false;
            }

            return m;
        })));






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
                status: m.available ? "available at pharmanet" : "not available",
                status_class: m.available ? "available" : "not-available",
                link: `/customers/${customer.id}/medicines/${m.id}`,
                cta: m.card ? 'already added' : 'add to card',
                cta_class: m.card ? "added medicine" : 'medicine',
            })).join(' ') : `"${search}" not available any medicine for this`,
            pharmacies: pharmacies.map(p => {
                let distance = "unavailable";
                if(latitude && longitude && p.latitude && p.longitude){
                    distance = calculateDistanceKM(latitude , longitude , p.latitude , p.longitude);
                    distance = distance.toFixed(2) + "KM";
                }


                return view('customer/component.pharmacy.card', {
                    ...p,
                    pharmacy: p.name,
                    pharmacyId: p.id,
                    image: p.img,
                    status: connectedPharmacies[p.id] ? "online" : "offline",
                    distance,
                    contact : p.contact || "+00 000 0000 000",
                    customerId : customer.id,
                })
            }).join(' '),
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
exports.renderCustomerSelectedMedicine = catchAsync(async (req, res) => {
    const [medicine] = await Medicines.getById(req.medicineId);
    const [customer] = await Users.getById(req.customerId);
    const { latitude, longitude } = readCookies(req);


    if (!medicine) throw new Error("medicine not found");
    if (!customer) throw new Error("customer not found");

    const stocks = await PharmacyMedicines.get({
        medicineId: medicine.id,
    });

    const pharmacies = await Promise.all(stocks.map(async s => {
        const [pharmacy] = await Pharmacies.getById(s.pharmacyId);

        if (!pharmacy) return undefined;

        let distance = "unavailable";
        if (latitude && longitude && pharmacy.latitude && pharmacy.longitude) {
            distance = calculateDistanceKM(latitude, longitude, pharmacy.latitude, pharmacy.longitude);
            distance = distance.toFixed(2) + "KM"
        }


        return {
            ...s,
            stock: Number(s.stock).toLocaleString('si-LK'),
            price: Number(s.price).toFixed(2).toLocaleString('si-LK'),
            pharmacy: pharmacy.name,
            addressNo: pharmacy.addressNo,
            street: pharmacy.street,
            town: pharmacy.town,
            province: pharmacy.province,
            contact: pharmacy.contact || "+00 000 000000",
            pharmacyId: pharmacy.id,
            image: pharmacy.img,
            customerId: customer.id,
            status: connectedPharmacies[pharmacy.id] ? "online" : "offline",
            distance,
        }
    }))

    const filteredPharmacies = pharmacies.filter(e => e != undefined);

    console.log(filteredPharmacies);

    console.log(connectedPharmacies);




    return response(res, view("customer/customer.medicine.blog", {
        header: view('component.header', {
            name: medicine.geneticName,
        }),
        navbar: view('customer/navbar.customer', customer),
        footer: view('footer'),
        ...medicine,
        cart: view('customer/component.cart'),
        availablePharmacies: filteredPharmacies?.length ? filteredPharmacies.map(phr => view('customer/component.pharmacy.card', phr)).join(' ') : `<div style="display:inline-block ; margin:0 auto; font-size: 3rem; color: #999;">This medicine not available in any pharmacy</div>`,
    }), 200);

})





