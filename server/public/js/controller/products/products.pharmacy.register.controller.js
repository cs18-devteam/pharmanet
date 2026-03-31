import Application from "../../model/application/Application.js";
import { submitPharmacyRegisterData } from "../../model/products/submitPharmacyRegisterData.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";

const pharmacyRegisterForm = document.getElementById("pharmacy-form");

const uploadStateConfig = {
  idle: { text: "Upload", enabled: true },
  uploading: { text: "Uploading...", enabled: false },
  success: { text: "Uploaded", enabled: false },
  error: { text: "Upload Failed. Try Again", enabled: true },
};

function setUploadLabelState(labelElement, state) {
  const config = uploadStateConfig[state] || uploadStateConfig.idle;
  labelElement.textContent = config.text;

  if (config.enabled) {
    labelElement.style.pointerEvents = "auto";
    labelElement.style.opacity = "1";
    labelElement.style.cursor = "pointer";
  } else {
    labelElement.style.pointerEvents = "none";
    labelElement.style.opacity = "0.6";
    labelElement.style.cursor = "not-allowed";
  }
}

function getUploadPairs(formElement) {
  return Array.from(formElement.querySelectorAll(".upload-btn"))
    .map((labelElement) => {
      const inputID = labelElement.getAttribute("for");
      const inputElement = inputID ? document.getElementById(inputID) : null;
      return { labelElement, inputElement };
    })
    .filter((pair) => pair.inputElement);
}

const uploadPairs = getUploadPairs(pharmacyRegisterForm);

uploadPairs.forEach(({ labelElement, inputElement }) => {
  setUploadLabelState(labelElement, "idle");

  inputElement.addEventListener("change", () => {
    if (inputElement.files && inputElement.files.length > 0) {
      setUploadLabelState(labelElement, "success");
    } else {
      setUploadLabelState(labelElement, "idle");
    }
  });
});

function setUploadingStateForSelectedFiles() {
  uploadPairs.forEach(({ labelElement, inputElement }) => {
    if (inputElement.files && inputElement.files.length > 0) {
      setUploadLabelState(labelElement, "uploading");
    } else {
      setUploadLabelState(labelElement, "idle");
    }
  });
}

function setErrorStateForSelectedFiles() {
  uploadPairs.forEach(({ labelElement, inputElement }) => {
    if (inputElement.files && inputElement.files.length > 0) {
      setUploadLabelState(labelElement, "error");
    } else {
      setUploadLabelState(labelElement, "idle");
    }
  });
}

function setSuccessStateForSelectedFiles() {
  uploadPairs.forEach(({ labelElement, inputElement }) => {
    if (inputElement.files && inputElement.files.length > 0) {
      setUploadLabelState(labelElement, "success");
    } else {
      setUploadLabelState(labelElement, "idle");
    }
  });
}

pharmacyRegisterForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  const input_pharmacyName = pharmacyRegisterForm.querySelector(
    'input[name="pharmacy-name"]',
  );
  const input_owner = pharmacyRegisterForm.querySelector('input[name="owner"]');
  const input_email = pharmacyRegisterForm.querySelector(
    'input[ name="ParmacyEmail"]',
  );
  const input_addressNo = pharmacyRegisterForm.querySelector(
    'input[name="address-no"]',
  );
  const input_addressStreet = pharmacyRegisterForm.querySelector(
    'input[name="address-street"]',
  );
  const input_addressTown = pharmacyRegisterForm.querySelector(
    'input[name="address-town"]',
  );
  const input_addressProvince = pharmacyRegisterForm.querySelector(
    'input[name="address-Province"]',
  );
  const input_addressPostalCode = pharmacyRegisterForm.querySelector(
    'input[name="address-postalCode"]',
  );
  const map = pharmacyRegisterForm.querySelector('input[name="map"]');
  const longitude = pharmacyRegisterForm.querySelector(
    'input[name="longitude"]',
  );
  const latitude = pharmacyRegisterForm.querySelector('input[name="latitude"]');
  const inputFile_pharmacyRegistration = pharmacyRegisterForm.querySelector(
    'input[name="p-reg-certificate"]',
  );
  const inputFile_pharmacyAddressProof = pharmacyRegisterForm.querySelector(
    'input[name="P-AddressProof"]',
  );
  const inputFile_ownerProof = pharmacyRegisterForm.querySelector(
    'input[name="OwnerProof"]',
  );

  formData.append("name", input_pharmacyName?.value);
  formData.append("email", input_email?.value);
  formData.append("owner", input_owner?.value);
  formData.append("addressNo", input_addressNo?.value);
  formData.append("street", input_addressStreet?.value);
  formData.append("town", input_addressTown?.value);
  formData.append("province", input_addressProvince?.value);
  formData.append("postalCode", input_addressPostalCode?.value);
  formData.append("latitude", latitude?.value);
  formData.append("longitude", longitude?.value);
  formData.append("googleMapLink", map?.value);
  formData.append("registrationDoc", inputFile_pharmacyRegistration?.files[0]);
  formData.append("ownerDoc", inputFile_ownerProof?.files[0]);
  formData.append("addressDoc", inputFile_pharmacyAddressProof?.files[0]);
  formData.append("image", inputFile_pharmacyRegistration?.files[0]);

  renderSpinner();
  const { status, results, message } = await submitPharmacyRegisterData(
    formData,
    1,
  );
  removeSpinner();

  if (status == "error") {
    swal({
      title: "Check your form again",
      text: message || " ",
      icon: "error",
    });
  } else if (status == "success") {
    swal({
      title: "Pharmacy Created",
      icon: "success",
    }).then(() => {
      window.location.href = `/pharmacies/${results.id}/staff/${results.pharmacist.id}`;
    });
  }
});
