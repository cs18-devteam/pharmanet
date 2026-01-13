import Application from "../../../model/application/Application.js";
import { fetchMedicineData } from "../../../model/pharmacy/fetchMedicineData.js";
import { openDrawer, setDrawerContent } from "../../../view/pharmacy/drawerView.js";
import { createMedicineCards, renderMedicineCards } from "../../../view/pharmacy/renderMedicineCards.js";
import { onClickMedicineCardOnNewItemMenu } from "./onClickMedicineCardOnNewItemMenu.js";

export async function searchAndRenderMedicinesAndProducts(search , limit = 6) {
    fetchMedicineData(search, limit).then(({ results }) => {
        Application.setOrderMedicineResultsStack(results);
        const medicineCards = createMedicineCards(results);
        const medicineCardContainer = document.querySelector(".chats.medicines_card_container");
        renderMedicineCards(medicineCardContainer , medicineCards);
        onClickMedicineCardOnNewItemMenu();
    })
}