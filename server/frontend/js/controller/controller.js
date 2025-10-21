import '../view/view.js';
import '../model/model.js';
import { handleAttendance } from './attendenceController.js';

document.addEventListener('click', (e) => {
    const target = e.target;

    // Check if clicked element (or parent) is the check-in button
    const attendanceFormCheckInButton = target.closest(".attendance-checkin-button");
    const attendanceFormDispatchButton = target.closest(".attendance-dispatch-button");
    const attendanceDeleteButton = target.closest('.attendance-delete-btn');
    const attendanceEditButton = target.closest('.attendance-edit');

    if (attendanceFormCheckInButton) {
        handleAttendance(attendanceFormCheckInButton , "CheckIn");

    }else if (attendanceFormDispatchButton) {
        handleAttendance(attendanceFormDispatchButton , "Dispatch");
    }else if(attendanceDeleteButton){
        handleAttendance(attendanceDeleteButton ,"Delete");
    }else if(attendanceEditButton){
        handleAttendance(attendanceEditButton , 'Edit')
    }

});




