const radioBtns = document.querySelectorAll('.pharmacyDashboard > input[type=radio]');

console.log(radioBtns);

export function changeWindowTo(id){
    Array.from(radioBtns).forEach(btn=>{
       if( btn.id != id) return;
       btn.setAttribute('checked' , true);
    })
}