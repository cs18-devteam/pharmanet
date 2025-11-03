export default function html(string , ...values){
    console.log(string.map((value , index)=>{
        return value + values[index];
    }).join(''))
    return string.map((value , index)=>{
        return value + (values[index] ? values[index] : "");
    }).join('');
}
