import Payment from "../../model/Payment.js";
import Application from "../../model/application/Application.js";
import { createTransaction } from "../../model/pharmacy/fetchTransactionsData.js";
import {
  createOrder,
  deleteOrder,
  getOrdersList,
  getTotalOrdersAndOrderCount,
  updateOrder,
} from "../../model/pharmacy/orders.js";
import {
  closeDrawer,
  openDrawer,
  setDrawerContent,
} from "../../view/pharmacy/drawerView.js";
import { createOrderTable } from "../../view/pharmacy/orders/orderTableView.js";
import { orderView } from "../../view/pharmacy/orders/orderView.js";
import { updateReceipt } from "../../view/pharmacy/orders/reciptView.js";
import {
  closeOrdersPaymentMode,
  openOrdersPaymentMode,
} from "../../view/pharmacy/orders__viewPaymentMode.js";
import { renderToast } from "../../view/renderToast.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";
import orders__searchAndRenderMedicineCard, {
  updateCardList,
} from "./orders/orders__searchAndRenderMedicineCards.js";
const cartList = document.querySelector(".orders .cart_list");

export default function init() {
  updateCardList(cartList, Application.getOrderItems());
  orders__searchAndRenderMedicineCard();

  const ordersBtn = document.querySelector(".orders .right-btns .payment-btn");
  const searchBtn = document.querySelector(".orders .right-btns .search-btn");

  ordersBtn.addEventListener("click", showOrders);
  searchBtn.addEventListener("click", () => {
    closeDrawer();
  });
  updateOrderSummery();
}

const paymentForm = document.querySelector(".orders .payment-section form");
const createOrderCreateBtn = document.querySelector(
  ".orders .footer-btn .create-order-btn",
);
const createOrderBackBtn = document.querySelector(
  ".orders .footer-btn .back-btn",
);
const ordersPayButton = document.querySelector(".orders .pay_button");
const paymentMethodButtons = document.querySelector(
  ".orders .select-payment-method .selection",
);
let paymentOption = undefined;
const printBtn = document.querySelector(".orders .print-btn");

function updatePaymentMethodScreen() {
  let total = 0;
  const items = Application.getOrderItems().map((i) => {
    if (i.medicineId) {
      const data = {};
      data.price = i.units * i.getMedicine().stock.price - i.discounts;
      data.quantity = i.units;
      data.name = i.getMedicine().geneticName;
      data.days = i.days;

      total += data.price;

      return data;
    } else {
      const data = {};
      data.price = i.units * i.getProduct().price - i.discounts;
      data.quantity = i.units;
      data.name = i.getProduct().name;
      data.days = 0;

      total += data.price;

      return data;
    }
  });

  updateReceipt({
    pharmacyName: Application.pharmacy?.name,
    orderId: "------",
    items: items,
    total,
  });
}

function clearOrderDetails() {
  Application.clearOrderItems();
  closeOrdersPaymentMode();
  updateCardList(cartList, Application.getOrderItems());
}

// openOrdersPaymentMode();
//? orders payment section view and close functions
ordersPayButton?.addEventListener("click", () => {
  if (Application.getOrderItems().length == 0) {
    swal({ title: "please select items to proceed order" });
    return;
  }
  openOrdersPaymentMode();
  updatePaymentMethodScreen();
});

createOrderBackBtn?.addEventListener("click", closeOrdersPaymentMode);

createOrderCreateBtn?.addEventListener("click", async () => {
  const formData = new FormData(paymentForm);

  for (const [key, value] of formData.entries()) {
    const input = paymentForm.querySelector(`[name="${key}"]`);
  }

  const items = Application.getOrderItems().map((item) => {
    return {
      itemType: item.medicineId ? "medicine" : "product",
      itemId: item.medicineId || item.productId,
      quantity: item.units,
      discount: item.discounts || 0,
    };
  });

  if (paymentOption == undefined) {
    swal({ title: "please select payment method" });
    return;
  }

  if (paymentOption == "cash") {
    const order = await createOrder({
      staffId: Application.staffId,
      pharmacyId: Application.pharmacyId,
      items,
      paymentMethod: "cash",
    });

    if (order.status == "success") {
      swal({
        title: "order created",
        icon: "success",
        timer: 800,
        showConfirmButton: false,
      });

      showOrders();
    } else {
      swal({
        title: "order failed",
        icon: "error",
      });
    }

    updateOrderSummery();
  }

  if (paymentOption == "card") {
    const order = await createOrder({
      staffId: Application.staffId,
      pharmacyId: Application.pharmacyId,
      items,
      paymentMethod: "card",
    });

    if (order.status == "error") {
      swal({
        title: "Order not Created",
        icon: "error",
        text: order.error,
      });
      return;
    }

    const payment = await Payment.create({
      orderId: order.results.orderId,
      amount: order.results.amount || 0,
      first_name: formData.get("f-name") || "no name",
      last_name: formData.get("l-name") || "no name",
      email: "---",
      items: "---",
      phone: "--",
      address: "--",
      city: "",
      country: "sri lanka",
      delivery_address: "",
      delivery_city: "",
      delivery_country: "sri lanka",
    });

    await payment.makePayment();
  }

  clearOrderDetails();
});

paymentMethodButtons?.addEventListener("click", (e) => {
  const target = e.target;
  const cardButton = target.closest(".card-btn");
  const cashButton = target.closest(".cash-btn");

  [cardButton, cashButton].forEach((el) => {
    if (!el) return;
    Array.from(paymentMethodButtons.children).forEach((el) =>
      el.classList.remove("active"),
    );
    el.classList.add("active");
    if (cardButton) {
      paymentOption = "card";
    } else if (cashButton) {
      paymentOption = "cash";
    }
  });
});

printBtn.addEventListener("click", () => {
  print();
});

let searchId = "";

async function showOrders(e) {
  const data = await getOrdersList();
  const results = data.results?.filter((o) =>
    String(o.id).includes(searchId || ""),
  ) || [];

  setDrawerContent(createOrderTable(results));
  openDrawer(e);
  const orderCloseBtn = document.querySelector(
    ".order-table-close-btn.close-btn > button",
  );
  orderCloseBtn?.addEventListener("click", (e) => {
    closeDrawer();
    init();
  });

  const searchBar = document.querySelector(".drawer .order-search-bar");
  searchBar.value = searchId;
  searchBar.focus();

  searchBar?.addEventListener("change", (e) => {
    searchId = searchBar.value;
    showOrders();
  });

  const orderTable = document.querySelector(".pharmacy-order-records");
  orderTable?.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (tr) {
      const orderId = tr.dataset.id;
      const order = data.results.filter((order) => order.id == orderId)[0];
      if (!orderId) return;

      setDrawerContent(orderView(order));

      openDrawer();

      document.querySelector(".btn.print")?.addEventListener("click", () => {
        const printWindow = window.open("", "_blank", "width=900,height=700");

        const itemsHtml = (order.items || [])
          .map(
            (item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.name || "-"}</td>
      <td>${item.quantity || 0}</td>
      <td>${item.price || 0}</td>
      <td>${item.discount || 0}</td>
      <td>${(item.price || 0) * (item.quantity || 0) - (item.discount || 0)}</td>
    </tr>
  `,
          )
          .join("");

        const transactionsHtml = (order.transactions || [])
          .map(
            (tr) => `
    <tr>
      <td>${tr.id}</td>
      <td>${tr.method || "-"}</td>
      <td>${tr.staffID || "-"}</td>
      <td>${new Date(tr.transactionDateTime).toLocaleDateString("si-LK")}</td>
      <td>${new Date(tr.transactionDateTime).toLocaleTimeString("si-LK")}</td>
      <td>${tr.type || "-"}</td>
      <td>Rs. ${tr.amount || "0.00"}</td>
    </tr>
  `,
          )
          .join("");

        printWindow.document.write(`
    <html>
      <head>
        <title>Order #ORD-${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
          h1, h2, h3 { margin: 0 0 12px; }
          .section { margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 14px; }
          th { background: #f3f3f3; }
          .meta { margin-bottom: 8px; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Order #ORD-${order.id}</h1>

        <div class="section">
          <h2>Basic Details</h2>
          <div class="meta">Order Date: ${order.createdAt?.replace(".000Z", "").split("T").join(" ") || "-"}</div>
          <div class="meta">Payment Status: ${order.isPaid ? "Paid" : "Pending"}</div>
          <div class="meta">Total Amount: Rs. ${order.total || 0}</div>
        </div>

        <div class="section">
          <h2>Order Items</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml || "<tr><td colspan='6'>No items</td></tr>"}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Method</th>
                <th>StaffId</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${transactionsHtml || "<tr><td colspan='7'>No transactions</td></tr>"}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
      });
      const backBtn = document.querySelector(
        ".order-container-order-view-back-btn",
      );
      backBtn?.addEventListener("click", () => {
        showOrders();
      });

      const orderViewContainer = document.querySelector(
        ".order-container-order-view",
      );

      orderViewContainer?.addEventListener("click", (e) => {
        const target = e.target;

        const deleteBtn = target.closest(".delete");
        if (deleteBtn) {
          swal({
            title: "are you want to delete ?",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
          })
            .then((data) => {
              if (data.isConfirmed) {
                return deleteOrder(deleteBtn.dataset.id);
              }
            })
            .then((data) => {
              if (data.status == "error") {
                swal({
                  icon: "error",
                  title: "some thing went wrong",
                  text: data.message || " ",
                });
              } else {
                swal({
                  icon: "success",
                  title: "order deleted successfully",
                }).then(() => {
                  showOrders();
                });
              }
            });
        }

        const dropDown = target.closest("select.order-status");
        dropDown?.addEventListener("input", async () => {
          const state = dropDown.value;
          const res = await updateOrder({
            id: orderId,
            status: state,
          });

          if (res.status == "success") renderToast("updated", "success");
          else renderToast("try again", "error");
        });

        const payCashButton = target.closest(".create-transaction .pay-cash");
        const payCardButton = target.closest(".create-transaction .pay-card");
        const createTransactionBanner = target.closest(".create-transaction");

        if (payCashButton) {
          renderSpinner();
          createTransaction({
            orderId: orderId,
            total: order.total,
            method: "cash",
          })
            .then(async (results) => {
              const { status, results: orderList } = await getOrdersList();
              if (results.status == "success") {
                swal({
                  title: "payment complete",
                  icon: "success",
                }).then(() => {
                  createTransactionBanner?.remove();
                  openDrawer();
                });
              } else {
                swal({
                  title: "payment failed",
                  icon: "error",
                }).then(() => {
                  openDrawer();
                });
              }
            })
            .catch((e) => {
              console.log(e);
            })
            .finally(() => {
              removeSpinner();
            });
        }

        if (payCardButton) {
          const payment = Payment.create({
            orderId: orderId,
            amount: order.total,
            callback: () => {
              swal({
                title: "payment complete",
                icon: "success",
              }).then(() => {
                createTransactionBanner?.remove();
                openDrawer();
              });
            },
          });

          payment.then((p) => {
            p.makePayment();
          });
        }
      });
    } else {
      return;
    }
  });
}

async function updateOrderSummery() {
  try {
    const { status, data: summery } = await getTotalOrdersAndOrderCount();
    if (status != "success") return;
    const totalAmount = document.querySelector(
      ".total__sales__description__amount",
    );
    if (totalAmount)
      totalAmount.textContent = `Rs ${Number(summery.total).toLocaleString("si-LK")}`;
    const totalOrders = document.querySelector(
      ".total__orders__description__amount",
    );
    if (totalOrders) totalOrders.textContent = summery.orders;
  } catch (e) {
    console.log(e);
  }
}
