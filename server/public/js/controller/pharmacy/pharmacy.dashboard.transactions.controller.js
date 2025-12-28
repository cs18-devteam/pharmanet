//*********FRONTEND CONTROLLER*********//
import Application from "../../model/application/Application.js";
import { getRequestData } from "../../model/pharmacy/fetchTransactionsData.js";
import { updateTable } from "../../view/pharmacy/updateTransactionTable.js";

// export default async function init() {
//     console.log("Transactions init");

//     try {

//         // function getPharmacyIdFromURL() {
//         //     const parts = window.location.pathname.split("/");
//         //     return parts[2]; // pharmacyId
//         // }

//         // const pharmacyId = getPharmacyIdFromURL();
//         // console.log(pharmacyId);
//         // // const response = await fetch(`/api/v1/pharmacies/${pharmacyId}/transactions`);

//         const response = await fetch(
//             `/api/v1/pharmacies/${Application.pharmacyId}/transactions`
//         );

//         console.log("STATUS:", response.status);
//         console.log("URL:", response.url);

//         if (!response.ok) throw new Error("Failed to fetch transactions");

//         const { results } = await response.json();

//         console.log("Transactions from API:", results);

//         renderIncome(results);
//         renderTable(results);
//         initDataFilter();

//     } catch (error) {
//         console.error("Transaction error:", error);
//     }
// }

// // Render total income
// function renderIncome(transactions) {

//     const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
//     document.querySelector(".income__value").textContent = total.toLocaleString();
//     console.log("transaction");
//     console.log(transactions);

// }

// // Render transactions table
// function renderTable(transactions) {
//     const tbody = document.querySelector(".transaction_table tbody");
//     tbody.innerHTML = "";

//     if (!transactions || transactions.length === 0) {
//         tbody.innerHTML = `
//             <tr>
//                 <td colspan="7" style="text-align:center;">No transactions found</td>
//             </tr>
//         `;
//         return;
//     }

//     transactions.forEach(t => {
//         const { date, time } = formatDateTime(t.transactionDateTime);

//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <td>${t.orderId}</td>
//             <td>${t.staffID || "-"}</td>
//             <td>${date}</td>
//             <td>${time}</td>
//             <td class="cash">
//                 ${renderMethod(t.method)}
//             </td>
//             <td class="online">
//                 ${renderType(t.type)}
//             </td>
//             <td>${Number(t.amount).toLocaleString()}</td>
//         `;

//         tbody.appendChild(row);
//     });
// }

export default async function init() {
  const table = document.querySelector(".transaction_table tbody");
  const startDate = document.getElementById("date_start");
  const endData = document.getElementById("data_end");
  const cashOffline = document.querySelector(".stat-cash .offline span");
  const cashOnline = document.querySelector(".stat-cash .online span");
  const cardOffline = document.querySelector(".stat-card .offline span");
  const cardOnline = document.querySelector(".stat-card .online span");
  const incomeValue = document.querySelector(".income__value");
  const summeryByStaff = document.querySelector(
    ".summery_staff_wise.summery_block"
);
  const summeryOfPayment = document.querySelector(
    ".summery_payment_method_wise.summery_block"
  );
  //console.log("init");
  const getRequestDatas = await getRequestData();
  updateTable(getRequestDatas)
  filterTodayTransaction(getRequestDatas)
  filterTransactionByDate(getRequestDatas)

  
}


export function filterTodayTransaction({results : transactionData}){

  //const table = document.querySelector(".transaction_table tbody");
  const incomeValue = document.querySelector(".income__value");

  const currentDate = new Date().toISOString().split("T")[0];
  //console.log(currentDate);
  
  const todayTotal = transactionData
    .filter(tr => {
      const trDate = new Date(tr.transactionDateTime)
        .toISOString()
        .split("T")[0];

        return trDate === currentDate;
    })
    .reduce((sum , tr) => sum + Number(tr.amount),0);


    console.log(todayTotal);
    incomeValue.innerHTML= Number(todayTotal);
    const startDate = document.getElementById("date_start");
    const endData = document.getElementById("data_end");

    const startDateValue = startDate.value;
    const endDataValue = endData.value;

    console.log("start date" ,startDateValue);
    console.log(endDataValue);
    
}

export function filterTransactionByDate({results : data}){

  const datas = data;

  const startDate = document.getElementById("date_start");
  const endDate = document.getElementById("data_end");

  function handleEvent(e){
    if(e.key === "Enter"){
      e.preventDefault();
      
      const startValue = startDate.value;
      const endValue = endDate.value;

      console.log(startValue);
      console.log(endValue);

      //return {startDate,endDate};
    }
  }
  console.log("hi");
  startDate.addEventListener("keydown", handleEvent);
  endDate.addEventListener("keydown",handleEvent);

}




