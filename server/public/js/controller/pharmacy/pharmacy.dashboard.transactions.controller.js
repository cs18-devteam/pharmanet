//*********FRONTEND CONTROLLER*********//

import Application from "../../model/application/Application.js";

export default async function init() {
    console.log("Transactions init");

    try {

        // function getPharmacyIdFromURL() {
        //     const parts = window.location.pathname.split("/");
        //     return parts[2]; // pharmacyId
        // }

        // const pharmacyId = getPharmacyIdFromURL();
        // console.log(pharmacyId);
        // // const response = await fetch(`/api/v1/pharmacies/${pharmacyId}/transactions`);

        const response = await fetch(
            `/api/v1/pharmacies/${Application.pharmacyId}/transactions`
        );

        console.log("STATUS:", response.status);
        console.log("URL:", response.url);



        if (!response.ok) throw new Error("Failed to fetch transactions");

        const { results } = await response.json();

        console.log("Transactions from API:", results);

        renderIncome(results);
        renderTable(results);
        initDataFilter();
        
    } catch (error) {
        console.error("Transaction error:", error);
    }
}

// Render total income
function renderIncome(transactions) {
    
    const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    document.querySelector(".income__value").textContent = total.toLocaleString();
    console.log("transaction");
    console.log(transactions);

}

// Render transactions table
function renderTable(transactions) {
    const tbody = document.querySelector(".transaction_table tbody");
    tbody.innerHTML = "";

    if (!transactions || transactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">No transactions found</td>
            </tr>
        `;
        return;
    }

    transactions.forEach(t => {
        const { date, time } = formatDateTime(t.transactionDateTime);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${t.orderId}</td>
            <td>${t.staffID || "-"}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td class="cash">
                ${renderMethod(t.method)}
            </td>
            <td class="online">
                ${renderType(t.type)}
            </td>
            <td>${Number(t.amount).toLocaleString()}</td>
        `;

        tbody.appendChild(row);
    });
}


// Optional: Add new transaction
export async function addTransaction(transactionObj) {
    try {
        const pharmacyId = window.PHARMACY_ID;

        const res = await fetch(
            `/api/v1/pharmacies/${pharmacyId}/transactions`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transactionObj),
            }
        );

        const data = await res.json();

        if (data.status === "success") {
            init(); // reload table
        } else {
            console.error("Transaction failed:", data.message);
        }

    } catch (e) {
        console.error("Add transaction error:", e);
    }
}

function formatDateTime(dateString) {
    if (!dateString) {
        return { date: "-", time: "-" };
    }

    const date = new Date(dateString);

    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    };
}


function renderMethod(method) {
    console.log("run renderMethod function");
    if (method === "card") {
        return `
            <div class="card">
                <img src="/transactions/card.svg" alt="card">
                card
            </div>
        `;
    }

    return `
        <div class="cash">
            <img src="/transactions/cash.svg" alt="cash">
            cash
        </div>
    `;

    
}

function renderType(type) {
    if (type === "online") {
        return `
            <div class="online">
                <img src="/transactions/online.svg" alt="online">
            </div>
        `;
    }

    return `
        <div class="offline">
            <img src="/transactions/offline.svg" alt="offline">
        </div>
    `;
}


function initDataFilter() {

    const startInput = document.getElementById("date_start");
    const endInput = document.getElementById("date_end");

    startInput.addEventListener('change', applyDataFilter);
    endInput.addEventListener('change', applyDataFilter);

}

async function applyDataFilter() {

    const startDate = document.getElementById("date_start").value;
    const endDate = document.getElementById("date_end").value;

    // No date range → load all transactions again
    if (!startDate || !endDate) {
        init();
        return;
    }

    try {
        const response = await fetch(
            `/api/v1/pharmacies/${Application.pharmacyId}/transactions?startDate=${startDate}&endDate=${endDate}`
        );

        console.log("Date filter URL:", response.url);

        if (!response.ok) {
            throw new Error("Failed to filter transactions");
        }

        const { results } = await response.json();

        console.log("Filtered transactions:", results);

        renderIncome(results);
        renderTable(results);

    } catch (error) {
        console.error("applyDataFilter error:", error);
    }
}

