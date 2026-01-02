
export function updateTable({results : data}){

    const table = document.querySelector(".transaction_table tbody");
    //console.log(data)
    //const incomeValue = document.querySelector(".income__value");
    //const currendate = new Date().toISOString().split("T")[0];
    //console.log("current date : ", currendate);

    const html = data.map(tr=>{
        const dateobj = new Date (tr.transactionDateTime);

        const thedate = dateobj.toISOString().split("T")[0];
        const time = dateobj.toISOString().split("T")[1].slice(0,5);

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