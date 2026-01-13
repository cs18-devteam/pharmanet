/**
 * 
 * @param {string} string 
 * @param  {...any} values 
 * @returns  {string}
 */
export default function html(string , ...values){
    return string.map((value , index)=>{
        return value + (values[index] ? values[index] : "");
    }).join('');
}
