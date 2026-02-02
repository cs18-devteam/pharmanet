import html from "../../html.js";

export function createOrderTable(data){


    return html`
    <div class="order-table-close-btn close-btn">
        <button>close</button>
    </div>
    <div class="table-wrapper">
    <h2 class="table-title">Order List</h2>

    <table class="orders-table pharmacy-order-records">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total (LKR)</th>
        </tr>
      </thead>

      <tbody>
        ${data?.map(order=>{
            return html`
              <tr data-id="${order.id}">
              <td>#ORD-${order.id}</td>
              <td>${order.createdAt.replace('.000Z' , '').split("T").join(' ') || "-"}</td>
              <td><span class="status ${order.status || "pending"}">${order.status || "pending"}</span></td>
              <td>${order.total || "-"}</td>
            </tr>
            `
        }).join(" ")}
        

        <!-- <tr data-id="2">
          <td>#ORD-002</td>
          <td>Nimal Fernando</td>
          <td>2026-02-01</td>
          <td><span class="status pending">Pending</span></td>
          <td>8,900</td>
        </tr>

        <tr data-id="3">
          <td>#ORD-003</td>
          <td>Saman Silva</td>
          <td>2026-01-31</td>
          <td><span class="status cancelled">Cancelled</span></td>
          <td>4,200</td> -->
        </tr>
      </tbody>
    </table>
  </div>`

}


