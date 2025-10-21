import { submitTime } from '../model/model.js';
import { setBtnState, setEditable } from '../view/attendanceView.js';

const attendanceForm = {
    state : 'CheckIn',
}


export function handleAttendance(btn , type){
    if(!btn) return new Error("no btn provided");
    const attendanceForm = btn.closest('.attendance-form');

    console.log(btn , type)

    if(!attendanceForm) return;

    let input = undefined;
    if(type == "CheckIn"){
        attendanceForm.state = "CheckIn";
        input = attendanceForm.querySelector('.attendance-checkin-input');

    }else if(type == "Dispatch"){
        attendanceForm.state = "Dispatch";
        input = attendanceForm.querySelector('.attendance-dispatch-input')

    }else if(type == "Edit" && attendanceForm.state != "Edit"){
        attendanceForm.state = 'Edit';
        input = attendanceForm.querySelectorAll('input[type=time]');
        setEditable(true ,input[0]);
        setEditable(true , input[1]);
        return;
    }else if(type == "Edit" && attendanceForm.state != "Edit"){
        input = attendanceForm.querySelectorAll('input[type=time]');

    }
    
    else if(type == "Delete"){
        attendanceForm.state = "Delete"
        input = true;
    }

    if(!input) return; 
    let value = undefined;


    if(input instanceof NodeList){
        value = [input[0].value , input[1].value];
    }else if(value !== true){
        value = input.value;
    }else{
        value = true;
    }

    if(!value) return;
    setEditable(false , input);
    setBtnState( 'loading',btn);

    submitTime({
        type:attendanceForm.state,
        time: value,
        uid: 1,
    }).then(data=>{
        if(data.status == "success"){
            setBtnState( 'success',btn);
        }else{
            setBtnState( 'error',btn);
        }
    }).catch(error=>{
        console.log(error);
        throw error;
    })
}
