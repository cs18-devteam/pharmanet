import html from "../../html.js";

export function orderView(order){
    console.log(order);
    
    
    return html`



<div class="order-container-order-view">
    <button class="order-container-order-view-back-btn">&larr; back</button>


    <header class="order-header">
      <h2>Order #ORD-${order.id}</h2>
      <div class="order-settings">

          <select class="order-status" value=${order.status || "pending"}>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
            <button data-id="${order.id}" class="btn print">print</button>
            <button data-id="${order.id}" class="btn delete">delete</button>
            <button data-id="${order.id}" class="btn edit">edit</button>
        </div>
            

    </header>

    <section class="order-info">
      <!-- <div>
        <label>Customer</label>
        <p>Chamath Perera</p>
      </div> -->

      <div>
        <label>Order Date</label>
        <p>2026-02-02</p>
      </div>

      <div>
        <label>Total Amount</label>
        <p>${order.total}</p>
      </div>
    </section>

    <section class="order-items">
      <h3>Order Items</h3>

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
            ${order.items?.map(item=>{
                return html`<tr>
                    <td>${item.id}</td>
                    <td>${item.name?.slice(0 , Math.min(20 , item.name?.length || 0)) + "..." || "-"}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.discount || "00"}</td>
                    <td>${item.price * item.quantity - item.discount}</td>
                </tr>
`
            }).join(" ")}
        </tbody>
      </table>
    </section>

  </div>
`;
}