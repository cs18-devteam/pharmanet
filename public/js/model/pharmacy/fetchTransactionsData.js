import Application from "../../model/application/Application.js";


export async function getRequestData() {
  try {
    const transaction = await fetch(
      `/api/v1/pharmacies/${Application.pharmacyId}/transactions`
    );

    if (!transaction.ok) {
      throw new error(`response status: $respones.status`);
    }

    const results = await transaction.json();
    //console.log(results);
    return results;
  } catch (e) {
    console.log(error);
    return {
      status: "error",
      resutls: [],
      message: e.message,
    };
  }
}

