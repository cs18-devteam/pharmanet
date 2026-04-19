function formatDate(date) {
  const pad = (n) => String(n).padStart(2, '0');

  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function formatTime(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}




export function updateTable({results : data}){

    const table = document.querySelector(".transaction_table tbody");
    //console.log(data)
    //const incomeValue = document.querySelector(".income__value");
    //const currendate = new Date().toISOString().split("T")[0];
    //console.log("current date : ", currendate);

  

    const html = data.map(tr=>{
        const dateobj = new Date (tr.transactionDateTime);
        

        const thedate = formatDate(dateobj);
        const time = formatTime(dateobj);

        console.log(dateobj , thedate , time);

        return `
            <tr>
                <td>${tr.orderId}</td>
                <td>${tr.staffID || "-"}</td>
                <td>${thedate}</td>
                <td>${time}</td>
                <td class="cash">
                    ${(tr.method)}
                </td>
                <td class="online">
                    ${(tr.type)}
                </td>
                <td>${Number(tr.amount).toLocaleString()}</td>
            </tr>

        `;
    }).join(' ');


    table.innerHTML = html;
    

     
    // data.forEach((row) => {`

    //     <td>${row.}</td>

    // `})


}