import html from "../../html.js";

export function createOrderTable(data) {



  return html`
    <div class="order-table-close-btn close-btn">
        <button>close</button>
    </div>
    <div class="table-wrapper">

    <h2 class="table-title">Order List</h2>
    <input type="text" class="order-search-bar"  placeholder="Type Order ID"/>



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
        ${data?.map(order => {
          const options = {
            timeZone: 'Asia/Colombo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          };



          let orderDateTime;
          if (order.createdAt) orderDateTime = new Date(order.createdAt)?.toLocaleDateString('en-CA', options).replace(',', ' ').replaceAll("-" , "/");

          return html`
                    <tr data-id="${order.id}">
                    <td>#ORD-${order.id}</td>
                    <td>${orderDateTime || "-"}</td>
                    <td><span class="status ${order.status || "pending"}">${order.status || "pending"}</span></td>
                    <td>${order.total || "-"}</td>
                  </tr>
            `
  }).join(" ")}
        
        </tr>
      </tbody>
    </table>
  </div>`

}


