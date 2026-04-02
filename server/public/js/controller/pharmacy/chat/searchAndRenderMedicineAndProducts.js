import Application from "../../../model/application/Application.js";
import { fetchMedicineData, fetchStocksData } from "../../../model/pharmacy/fetchMedicineData.js";
import { openDrawer, setDrawerContent } from "../../../view/pharmacy/drawerView.js";
import { createMedicineCards, renderMedicineCards } from "../../../view/pharmacy/renderMedicineCards.js";
import { createProductCards } from "../../../view/pharmacy/renderProductCards.js";


export async function searchAndRenderMedicinesAndProducts(search, limit = 6) {

    fetchStocksData(search, limit , Application.pharmacyId).then(({ results }) => {
        const medicineCards = createMedicineCards(results.filter(p => p.type != "product"));
        const productCards = createProductCards(results.filter(p => p.type == "product"))
        const medicineCardContainer = document.querySelector(".chats.medicines_card_container");
        renderMedicineCards(medicineCardContainer, [...medicineCards, ...productCards]);
    })
}