//*********FRONTEND CONTROLLER*********//
import Application from "../../model/application/Application.js";
import { getRequestData } from "../../model/pharmacy/fetchTransactionsData.js";
import { updateTable } from "../../view/pharmacy/updateTransactionTable.js";
import { getStaffSummary } from "../../model/pharmacy/fetchTransactionsData.js";

export default async function init() {
  const table = document.querySelector(".transaction_table tbody");
  const startDate = document.getElementById("date_start");
  const endData = document.getElementById("date_end");
  const cashOffline = document.querySelector(".stat-cash .offline span");
  const cashOnline = document.querySelector(".stat-cash .online span");
  const cardOffline = document.querySelector(".stat-card .offline span");
  const cardOnline = document.querySelector(".stat-card .online span");
  const incomeValue = document.querySelector(".income__value");
  const summeryByStaff = document.querySelector(
    ".summery_staff_wise.summery_block",
  );
  const summeryOfPayment = document.querySelector(
    ".summery_payment_method_wise.summery_block",
  );

  //print option

  const printBtn = document.querySelector(".print-btn");

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      console.log("PRINT CLICKED");
      window.print();
    });
  } else {
    console.log("PRINT BUTTON NOT FOUND");
  }

  //console.log("init");
  const getRequestDatas = await getRequestData();
  //const getStaffDatas = await getStaffData();
  updateTable(getRequestDatas);
  filterTodayTransaction(getRequestDatas);
  filterTransactionByDateRange(getRequestDatas);
  totalAmountOfCachOnline(getRequestDatas);
  totalAmountOfCachOffline(getRequestDatas);
  totalAmountOfcardOnline(getRequestDatas);
  totalAmountOfCardOffline(getRequestDatas);
  updateTodayTransaction(getRequestDatas);
  updateStaffWiseSummary();
  //printTransaction()
}

export function filterTodayTransaction({ results: transactionData }) {
  const currentDate = new Date().toISOString().split("T")[0];

  //console.log(currentDate);

  const todayTotal = transactionData
    .filter((tr) => {
      const trDate = new Date(tr.transactionDateTime)
        .toISOString()
        .split("T")[0];

      return trDate === currentDate;
    })
    .reduce((sum, tr) => sum + Number(tr.amount), 0);

  console.log(todayTotal);

  return todayTotal;
}

export function updateTodayTransaction({ results: transactionData }) {
  const incomeValue = document.querySelector(".income__value");
  const totalAmount = filterTodayTransaction({ results: transactionData });

  console.log(totalAmount);
  incomeValue.innerHTML = totalAmount;
}

export function filterTransactionByDateRange({ results: data }) {
  const table = document.querySelector(".transaction_table tbody");
  const startDate = document.getElementById("date_start");
  const endDate = document.getElementById("date_end");

  if (!table || !startDate || !endDate) return;

  function eventHandle(e) {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const startValue = startDate.value;
    const endValue = endDate.value;

    if (!startValue || !endValue) {
      console.warn("Select Both Date");
      return;
    }

    //filter data
    const filteredDate = data.filter((tr) => {
      const trDate = new Date(tr.transactionDateTime)
        .toISOString()
        .split("T")[0];

      return trDate >= startValue && trDate <= endValue;
    });

    //map filter data
    const mapFilterData = filteredDate
      .map((tr) => {
        const dateObj = new Date(tr.transactionDateTime);
        const date = dateObj.toISOString().split("T")[0];
        const time = dateObj.toISOString().split("T")[1].slice(0, 5);

        return `
        <tr>
          <td>${tr.orderId}</td>
          <td>${tr.staffID || "-"}</td>
          <td>${date}</td>
          <td>${time}</td>
          <td class="cash">
              ${tr.method}
          </td>
          <td class="online">
              ${tr.type}
          </td>
          <td>${Number(tr.amount).toLocaleString()}</td>
        </tr>
      `;
      })
      .join(" ");

    table.innerHTML = mapFilterData;
  }

  startDate.addEventListener("keydown", eventHandle);
  endDate.addEventListener("keydown", eventHandle);
}

export function totalAmountOfCachOnline({ results: data }) {
  const cashOnline = document.querySelector(".stat-cash .online span");
  const prograss = document.querySelector(".bar-cash__online span");
  //console.log(cashOffline);
  const today = new Date().toISOString().split("T")[0];

  const todayCashPayment = data
    .filter((tr) => {
      const trDate = new Date(tr.transactionDateTime)
        .toISOString()
        .split("T")[0];

      return trDate === today && tr.method === "cash" && tr.type === "online";
    })
    .reduce((sum, tr) => sum + Number(tr.amount), 0);

  //console.log("today cash payment");
  //console.log(todayCashPayment);
  cashOnline.innerHTML = todayCashPayment;

  const todayTransaction = filterTodayTransaction({ results: data });

  const percentage =
    todayTransaction > 0
      ? Math.floor((todayCashPayment / todayTransaction) * 100)
      : 0;

  prograss.style.width = `${percentage}%`;
  prograss.innerHTML = `${percentage}%`;
  //console.log(percentage);
}

export function totalAmountOfCachOffline({ results: data }) {
  const cashOffline = document.querySelector(".stat-cash .offline span");
  const prograss = document.querySelector(".bar-cash__offline span");
  //console.log(cashOffline);
  const today = new Date().toISOString().split("T")[0];

  const todayCashPayment = data
    .filter((tr) => {
      const trDate = new Date(tr.transactionDateTime)
        .toISOString()
        .split("T")[0];

      return trDate === today && tr.method === "cash" && tr.type === "offline";
    })
    .reduce((sum, tr) => sum + Number(tr.amount), 0);

  //console.log("today cash payment");
  //console.log(todayCashPayment);
  cashOffline.innerHTML = todayCashPayment;

  const todayTransaction = filterTodayTransaction({ results: data });
  const percentage =
    todayTransaction > 0
      ? Math.floor((todayCashPayment / todayTransaction) * 100)
      : 0;

  prograss.style.width = `${percentage}%`;
  prograss.innerHTML = `${percentage}%`;
}

export function totalAmountOfcardOnline({ results: datas }) {
  const cardOnline = document.querySelector(".stat-card .online span");
  const prograss = document.querySelector(".bar-card__online span");

  const today = new Date().toISOString().split("T")[0];

  const todayOnlineCardPayment = datas
    .filter((tr) => {
      const date = new Date(tr.transactionDateTime).toISOString().split("T")[0];

      return date === today && tr.method === "card" && tr.type === "online";
    })
    .reduce((sum, tr) => sum + Number(tr.amount), 0);

  cardOnline.innerHTML = todayOnlineCardPayment;

  const todayTransaction = filterTodayTransaction({ results: datas });
  const percetage =
    todayTransaction > 0
      ? Math.floor((todayOnlineCardPayment / todayTransaction) * 100)
      : 0;

  prograss.style.width = `${percetage}%`;
  prograss.innerHTML = `${percetage}%`;
}

export function totalAmountOfCardOffline({ results: data }) {
  const cardOffline = document.querySelector(".stat-card .offline span");
  const prograss = document.querySelector(".bar-card__offline span");
  const today = new Date().toISOString().split("T")[0];

  const filteredDate = data
    .filter((tr) => {
      const date = new Date(tr.transactionDateTime).toISOString().split("T")[0];

      return date === today && tr.method === "card" && tr.type === "offline";
    })
    .reduce((sum, tr) => sum + Number(tr.amount), 0);

  cardOffline.innerHTML = filteredDate;
  console.log(filteredDate);

  const todayTransaction = filterTodayTransaction({ results: data });
  const percetage =
    todayTransaction > 0
      ? Math.floor((filteredDate / todayTransaction) * 100)
      : 0;

  prograss.style.width = `${percetage}%`;
  prograss.innerHTML = `${percetage}%`;
}

export async function updateStaffWiseSummary() {
  const container = document.querySelector(".summery_staff_wise.summery_block");

  if (!container) return;

  const { results } = await getStaffSummary();

  if (!results.length) {
    container.innerHTML = "<p>No staff data available</p>";
    return;
  }

  const html = results
    .map(
      (staff) => `
    <div class="analytics">
      <div class="description">
        <div class="name">${staff.staffName}</div>
        <div class="orders">( ${staff.orders} Orders )</div>
        <div class="amount">${Number(staff.totalAmount).toLocaleString()}</div>
      </div>
      <div class="bar"></div>
    </div>
  `,
    )
    .join("");

  container.innerHTML = `
    <div class="group-by">
      <img src="/transactions/user.svg" alt="">
      Group by staff Members
    </div>
    ${html}
  `;
}

export function printTransaction() {
  window.print();
}
