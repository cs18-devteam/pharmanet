
const incomingMessage = document.querySelector('.incoming_messege_box');

export function showIncomingMessage(data){
    incomingMessage?.classList.add('open');
}
    
export function removeIncomingMessage(){
    incomingMessage?.classList.remove('open');

}
