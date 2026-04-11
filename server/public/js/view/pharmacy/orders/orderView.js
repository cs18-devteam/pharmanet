import Application from "../../../model/application/Application.js";
import html from "../../html.js";
import { swal } from "../../swal.js";

export function orderView(order) {
  try{

  console.log(order);
  if(!order) return;
  
  let staffMember = undefined;
  if(order.staffId && Application.staffData.length){
    staffMember = Application.staffData.find(s=>s.id == order.staffId)
  }

  return html`



<div class="order-container-order-view">
    <button class="order-container-order-view-back-btn">&larr; back</button>


    <header class="order-header">
      <h2>Order #ORD-${order.id}</h2>
      <div class="order-settings">

          <select class="order-status">
              <option ${order.status == "pending" ? "selected" : ""} value="pending">Pending</option>
              <option ${order.status == "processing" ? "selected" : ""} value="processing">Processing</option>
              <option ${order.status == "completed" ? "selected" : ""} value="completed">Completed</option>
            </select>
            <button data-id="${order.id}" class="btn print">print</button>
            <button data-id="${order.id}" class="btn delete">delete</button>
            <button data-id="${order.id}" class="btn edit">edit</button>
        </div>
            

    </header>

    <h3>Basic Details</h3>
    <section class="order-info basic" >
       ${order?.prescription ? html`<div>
        <p>
          <a href="/${order.prescription}" target="_black">
            <img src="/${order.prescription}" style="cursor : pointer;width : 10rem; aspect-ratio:1; border-radius: 1rem;"  />
          </a>
        </p>
      </div>` : ""}

      <div>
        <label>Order Date</label>
        <p>${order.createdAt.replace('.000Z', '').split("T").join(' ') || "-"}</p>
      </div>

      <div>
        <label>Payment Status </label>
        <p>${order.isPaid ? "Paid" : "<span style='color:var(--color-red-01);'>Pending</span>"}</p>
      </div>


      <div>
        <label>Total Amount</label>
        <p>Rs. ${order.total}</p>
      </div>

      ${staffMember ? html`
        <div>
        <label>Staff Member </label>
        <p>(ID:${staffMember.id})  ${staffMember.firstName} ${staffMember.lastName}</p>
        </div>
      ` : "" }
      
   
    </section>

    ${order.userId ? 
      html`<h3>Customer Details</h3>
    <section class="order-info basic" >

      <div>
        <label>ID </label>
        <p>${order.userId}</p>
      </div>

      <div>
        <label>Name </label>
        <p>${order.customer ? order.customer : "-"}<p>
      </div>


      <div>
        <label>Address</label>
        <p>${order.address ? order.address : "-"}</p>
      </div>
      
   
    </section>`:" "

    }
    


    
      <hr style="margin: 2rem;">
      
    
    <section class="order-items">
      <h3>Order Items List</h3>

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
            ${order.items?.map(item => {
    return html`<tr>
                    <td>${item.id}</td>
                    <td>${item.name?.slice(0, Math.min(20, item.name?.length || 0)) + "..." || "-"}</td>
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
  

      <hr style="margin: 2rem;">

          
      <section class="order-items">
      <h3>Transactions List</h3>

      ${(order.transactions.length) ?  
        html`
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>method</th>
              <th>StaffId</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
              ${order.transactions?.map(tr => {
                  return html`<tr>
                                  <td>${tr.id}</td>
                                  <td>${tr.method || "-"}</td>
                                  <td>${tr.staffID || "-"}</td>
                                  <td>${new Date(tr.transactionDateTime).toLocaleDateString('si-LK') || "-"}</td>
                                  <td>${new Date(tr.transactionDateTime).toLocaleTimeString('si-LK') || "-"}</td>
                                  <td>${tr.type || "-"}</td>
                                  <td> Rs. ${tr.amount || "0.00"}</td>
                              </tr>
              `
                }).join(" ")}
            </tbody>
          </table>`

      :
           
           html`<div class="create-transaction">
              <p class="para">Add Transaction 
                <span style="color:var(--color-yellow-01);">
                (Rs. ${order.total})</p>
              </span>
              <div class="buttons">
                <button class="pay-cash">Pay by Cash</button>
                <button class="pay-card">Pay by Card</button>

              </div>
            </div>`
        }
      
    </section>   




  </div>
`;


  }catch(e){
    console.log(e);
    swal({
      title:"something wrong with order menu",
      text:e.message,
      icon:'error',
    })
  }

}