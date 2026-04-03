import Application from "../../model/application/Application.js";


export async function getRequestData() {
  try {
    const transaction = await fetch(
      `/api/v1/pharmacies/${Application.pharmacyId}/transactions`
    );

    if (!transaction.ok) {
      throw new error(`response status: $respones.status`);
    }

    const results = await transaction.json(); //decode the data 

    //console.log(results);
    return results;
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      results: [],
      message: e.message,
    };
  }
}


// export async function getStaffData(){

//   try {
//     const staff = await fetch(
//       `/api/v1/pharmacies/${Application.pharmacyId}/staff`
//     );

//     if (!staff.ok) {
//       throw new Error(`response status: ${staff.status}`);
//     }

//     const results = await staff.json();

//     return results;
//   } catch (e) {
//     console.log(e);
//     return {
//       status: "error",
//       results: [],
//       message: e.message,
//     };
//   }
// }

export async function getStaffSummary() {
  try {
    const res = await fetch(
      `/api/v1/pharmacies/${Application.pharmacyId}/transactions/staff-summary`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch staff summary");
    }

    return await res.json();
  } catch (e) {
    console.log(e);
    return { status: "error", results: [] };
  }
}



export async function createTransaction({
  orderId,
  total,
  transactionId,
}) {
  try {
    let typeOfTransaction = "offline";
    if(!Application.pharmacyId) typeOfTransaction = "online";

    const transactionObj = {
      orderId: orderId,
      pharmacyId: (typeOfTransaction == "online") ?  Application.connectedWith : Application.pharmacyId,
      amount: total,
      type:  typeOfTransaction,
      staffID: Application.staffId,
      method: "card",
      transactionId,
      userId : (typeOfTransaction == "online") ? Application.userId : null,
    };

    console.log(transactionObj);
    const res = await fetch(`/api/v1/pharmacies/${Application.pharmacyId}/transactions`, {
      method: "POST",
      body: JSON.stringify(transactionObj),
    })

    if (!res.ok) throw new Error("transaction not complete");
    const data = await res.json();
    console.log(data);
    return data;

  } catch (e) {
    console.log(e);
    return {
      status: "error",
      results: [],
      error: e.error || "something went wrong",
    }
  }
}