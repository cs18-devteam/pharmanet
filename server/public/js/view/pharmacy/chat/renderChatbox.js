const chatsContainer = document.querySelector(".container.chats");
import html from "./../../html.js";

const template =  html`
    <div class="left">
                <div class="chat-box">
                    
                    <div class="header-section">
                        <div class="customer-name">Chathura Priyashan</div>
                        <div class="discount">Discount</div>
                    </div>

                    <div class="body-section">
                        
                    </div>

                    <div class="footer-section">
                        <form class="type-bar-container" action="post">
                            <input type="text" placeholder="Type Here" class="type-msg">
                            <button><img src="/images/message-icon.svg" alt="message-icon"></button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="middle">
                <div class="cart">
                    <div class="header-section">
                        <div class="add-new-item-btn">Add New Item +</div>
                    </div>

                    <div class="body-section">
                        

                        <div class="medicine_card" >
                            <div class="medicine-card-header">
                                <div class="dosage-icon" >
                                
                                    <img width="60rem" src="/images/bottel_of_pills.svg">  

                                </div>


                                <div class="details">
                                    <div class="medicine__name">
                                        <div class="name">Name</div>
                                        AMPICILLIN SODIUM FOR INJECTION BP 250MG
                                    </div>
                                    <div class="medicine__info">
                                    
                                        <div class="medicine__info__price">
                                            <span>
                                                <div class="store-as__icon">
                                                    <img src="/images/price_tag.svg" width="20rem" >
                                                </div>
                                            </span>
                                            <span>price</span>
                                            <span class="price">
                                                <span>Rs<div class="price__value">1,234</div></span>
                                             
                                            </span>
                                        </div>
                                    </div>
                                
                                    
                                </div>

                                <div class="added-btn">
                                    Added +
                                </div>
                            </div>

                            <div class="medicine-card-footer">

                                <div class="card-footer unit">
                                    Units <span>20</span>
                                </div>

                                <div class="card-footer days">
                                    Days <span>20</span>
                                </div>

                                <div class="card-footer discount">
                                    Discounts (Rs) <span>20</span>
                                </div>
                            </div>
                        

                        </div>

                        <div class="medicine_card" >
                            <div class="medicine-card-header">
                                <div class="dosage-icon" >
                                
                                    <img width="60rem" src="/images/bottel_of_pills.svg">  

                                </div>


                                <div class="details">
                                    <div class="medicine__name">
                                        <div class="name">Name</div>
                                        AMPICILLIN SODIUM FOR INJECTION BP 250MG
                                    </div>
                                    <div class="medicine__info">
                                    
                                        <div class="medicine__info__price">
                                            <span>
                                                <div class="store-as__icon">
                                                    <img src="/images/price_tag.svg" width="20rem" >
                                                </div>
                                            </span>
                                            <span>price</span>
                                            <span class="price">
                                                <span>Rs<div class="price__value">1,234</div></span>
                                               
                                            </span>
                                        </div>
                                    </div>
                                
                                    
                                </div>

                                <div class="added-btn">
                                    Added +
                                </div>
                            </div>

                            <div class="medicine-card-footer">

                                <div class="card-footer unit">
                                    Units <span>20</span>
                                </div>

                                <div class="card-footer days">
                                    Days <span>20</span>
                                </div>

                                <div class="card-footer discount">
                                    Discounts (Rs) <span>20</span>
                                </div>
                            </div>
                        

                        </div>

                        

                        
                    </div>
                    <div class="footer-section">

                        <div class=" btn cancel-btn">Cancel</div>
                        <div class="btn create-order-btn">Create Order</div>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="prescription">
                    <div class="request-prescription-btn">Request Prescription</div>
                </div>

                <div class="payment-details">
                    <h1>Payment Details</h1>
                    <div class="method">Method 
                        <span class="method-selector">Cash</span>

                    </div>
                    <div class="status">Status
                        <span class="status-selector">Pending</span>

                    </div>

                    <div class="request-payment-btn">Request Payment</div>
                </div>

                <div class="recipe-details">
                    <h1>Recipe Details</h1>
                    <div>
                        <span>Total</span>
                        <span>Rs<span class="total">1,345</span></span>
                    </div>
                    <div>
                        <span>Discounts</span>
                        <span>-Rs<span class="total">100</span></span>
                    </div>
                    <div>
                        <span>Loyality Dis</span>
                        <span>-Rs<span class="total">45</span></span>
                    </div>
                    <div class="final-price">
                        <span>Final Price</span>
                        <span>Rs<span class="total">1,200</span></span>
                    </div>

                    <div class="print-recipe">Print Recipe</div>
                    
                </div>
            </div>
`;



export function renderChatBox(){
    chatsContainer.innerHTML = template;
}