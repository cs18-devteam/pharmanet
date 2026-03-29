import Application from "../../model/application/Application.js";
import { submitPharmacyRegisterData } from "../../model/products/submitPharmacyRegisterData.js";
import { removeSpinner, renderSpinner } from "../../view/spinner.js";
import { swal } from "../../view/swal.js";

const pharmacyRegisterForm = document.getElementById("pharmacy-form");

pharmacyRegisterForm.addEventListener('submit' ,async e=>{
    e.preventDefault();

    const formData = new FormData();
    const input_pharmacyName = pharmacyRegisterForm.querySelector('input[name="pharmacy-name"]');
    const input_owner = pharmacyRegisterForm.querySelector('input[name="owner"]');
    const input_email = pharmacyRegisterForm.querySelector('input[ name="ParmacyEmail"]');
    const input_addressNo = pharmacyRegisterForm.querySelector('input[name="address-no"]');
    const input_addressStreet = pharmacyRegisterForm.querySelector('input[name="address-street"]');
    const input_addressTown = pharmacyRegisterForm.querySelector('input[name="address-town"]')
    const input_addressProvince = pharmacyRegisterForm.querySelector('input[name="address-Province"]')
    const input_addressPostalCode = pharmacyRegisterForm.querySelector('input[name="address-postalCode"]')
    const map = pharmacyRegisterForm.querySelector('input[name="map"]')
    const longitude = pharmacyRegisterForm.querySelector('input[name="longitude"]')
    const latitude = pharmacyRegisterForm.querySelector('input[name="latitude"]')
    const inputFile_pharmacyRegistration = pharmacyRegisterForm.querySelector('input[name="p-reg-certificate"]');
    const inputFile_pharmacyAddressProof = pharmacyRegisterForm.querySelector('input[name="P-AddressProof"]');
    const inputFile_ownerProof = pharmacyRegisterForm.querySelector('input[name="OwnerProof"]');



    formData.append('name' , input_pharmacyName?.value);
    formData.append('email' , input_email?.value);
    formData.append('addressNo' , input_addressNo?.value);
    formData.append('street' , input_addressStreet?.value);
    formData.append('town' , input_addressTown?.value);
    formData.append('province' , input_addressProvince?.value);
    formData.append('postalCode' , input_addressPostalCode?.value);
    formData.append('latitude' ,  latitude?.value);
    formData.append('longitude' ,  longitude?.value);
    formData.append('googleMapLink' ,  map?.value);
    formData.append('registrationDoc' ,  inputFile_pharmacyRegistration?.files[0]);
    formData.append('ownerDoc' ,  inputFile_ownerProof?.files[0]);
    formData.append('addressDoc' ,  inputFile_pharmacyAddressProof?.files[0]);

    
    renderSpinner();
    const {status ,results , message} = await submitPharmacyRegisterData(formData , Application.userId);
    removeSpinner();

    if(status == "error"){
        swal({
            title:"Check your form again",
            text: message || ' ',
            icon:"error",
        })
    }


    if(status == "success"){
        swal({
            title:"Pharmacy Created",
            icon:"success",
        }).then(()=>{
            window.location.href = `/pharmacies/${results.id}/staff/${results.pharmacist.id}`;
        })
    };





})