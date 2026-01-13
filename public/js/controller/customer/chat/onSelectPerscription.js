import Application from "../../../model/application/Application.js";
import cart from "../../../view/customer/Cart.js";

export default async function onSelectPrescription (e , input , card , skip){
                try{
                    skip.addEventListener('click' ,()=>cart.closePopup());

                    debugger;

                    const file = input.files[0];
                    const formData = new FormData();
                    formData.append('prescription' , file);
                    formData.append('orderId' , Application.remoteOrderId);

                    const cartUploadButton = card.querySelector('label[for="prescription-upload-input"]');
                    const response = await fetch(`/api/v1/customers/${Application.userId}/chats/assets/prescriptions` , {
                        method:"POST",
                        body : formData,
                    });

                    const data = await response.json();
                    if(data.status == "success"){
                        Application.connection.send(ChatTemplates.syncConnection(data.orderId));
                    }else{
                        renderToast("prescription upload failed" , 'error');    
                    }
                    cart.closePopup();



                    cartUploadButton.textContent = "uploading...";




                }catch(e){
                    console.log(e);
                }


            }