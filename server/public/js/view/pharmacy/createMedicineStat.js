import html from "../html.js";

export function createMedicineStat(data) {
    console.log(data);
    const colors = [
        "var(--color-red-01)",
        "var(--color-green-01)",
        "var(--color-green-02)",
        "var(--font-linear-secondary-color)",
        "var(--color-blue-01)",
        "var(--color-blue-02)",
        "var(--color-pink-01)",
        "var(--color-yellow-01)",
        "var(--color-yellow-02)",
        "var(--font-linear-primary-color)",
    ]

    const quantity = data.reduce((acc , curr)=>acc + (curr.quantity || 0) , 0);
    data.forEach(d=>{
        d.percentage = (d.quantity / quantity) * 100;
    })

    return html`
        <section class="medicine-stat">
            <h3>Most Sold medicines Globally</h3>
            <div class="chart">
                ${data.map((d , i)=>{
                    return html`
                        <div style="height : ${d.percentage}%;background-color : ${colors[i]} ; width: ${100/data.length}%" class="bar">
                            <span class="percentage" style="border : 3px solid ${colors[i]}">${Number(d.percentage).toFixed(0)}%</span>
                        </div>`
                }).join(" ")}
            </div>

            <div class="labels">
                ${data .map((d , i)=>html`
                    <div  class="label">
                        <span style="background-color : ${colors[i]}" class="dot"></span>
                            ${d.available ? `<span class="available" >available</span>` : `<span class="unavailable">unavailable</span>`}
                        
                        (ID${d.medicineId}) ${d.name}
                    </div>`).join(' ')}
            </div>



        </section>
    
    `
}