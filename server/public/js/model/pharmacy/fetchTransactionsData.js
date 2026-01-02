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
    console.log(error);
    return {
      status: "error",
      results: [],
      message: e.message,
    };
  }
}


export async function getStaffData(){

  try {
    const staff = await fetch(
      `/api/v1/pharmacies/${Application.pharmacyId}/staff`
    );

    if (!staff.ok) {
      throw new Error(`response status: ${staff.status}`);
    }

    const results = await staff.json();

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