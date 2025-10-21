export function setBtnState(state , btn){
    if(state == 'loading'){
        btn.classList.add('.loading');
        btn.textContent = "updating...";
    }else if(state== 'error'){
        btn.classList.add('error');
        btn.classList.remove('loading');
        btn.textContent = "Error";
    }else if(state=="success"){
        btn.classList.add('complete');
        btn.classList.remove('loading');
        btn.textContent = "Updated";
    }
}

export function setEditable(bool , input){
    input.readOnly = !bool;
}