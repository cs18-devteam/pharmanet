import { jsDateToSqlDate } from "/js/utilities/convertDateToSqlDate.js";

const today = jsDateToSqlDate(Date.now());

export async function fetchTransactions(pharmacyId  , userId , staffId , startDate=jsDateToSqlDate(Date.now()),){
    
}