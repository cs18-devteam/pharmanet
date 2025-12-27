
export function updateTable({results : data}){

    const table = document.querySelector(".transaction_table tbody");
    console.log(data)


    const html = data.map(tr=>{
        const date = "" , time = "";


        return `
            <tr><td>${tr.orderId}</td>
            <td>${tr.staffID || "-"}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td class="cash">
                ${(tr.method)}
            </td>
            <td class="online">
                ${(tr.type)}
            </td>
            <td>${Number(tr.amount).toLocaleString()}</td></tr>
        `;
    }).join(' ');


    table.innerHTML = html;

     
    // data.forEach((row) => {`

    //     <td>${row.}</td>

    // `})


}