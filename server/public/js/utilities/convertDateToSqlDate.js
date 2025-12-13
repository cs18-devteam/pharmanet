/**
 * 
 * @param {Date} date 
 */
export function jsDateToSqlDate(date){
    const jsDate = new Date(date);
    const original = jsDate.toLocaleString('si-LK').replaceAll("/" , "-");
    let [formattedDate , time] = original.split(', ');
    return {
        date : formattedDate , 
        time , 
        fullDate : original.replace(',' , ''),
    }
}
