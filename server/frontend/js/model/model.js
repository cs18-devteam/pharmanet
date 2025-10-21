export async function submitTime(body){
    const respond =await fetch('/pharmacy/staff?id=1&uid=1', {
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({
            type:body.type || "CheckIn",
            time: body.time || (new Date(Date.now()).toTimeString),
            uid: body.uid,
        })
    });

    if(!respond) return {
        status:"error",
        message:"respond undefined",
    }

    const data = await respond.json();
    
    if(!data) return {
        status:"Warning",
        message:"Respond received , but body is empty"
    }

    return data;
}

const monthLength = [31 , 28 , 31, 30 , 31 , 30 , 31 ,31 , 30 , 31 , 30 , 31];

export async function fetchAttendanceData({pharmacyId , userId}){
    const respond =await fetch(`/pharmacy/staff/attendance?id=${pharmacyId}&uid=${userId}` , {
        method:"GET"
    });
    const data =await respond.json();
    const today = new Date(Date.now());
    const year = today.getFullYear();
    const month = today.getMonth();
    const dayOfMonth = today.getDay();
    const days = [];

    for(let day=1 ; day <= monthLength[new Date(Date.now).getMonth()]; day++ ){

        
        const attendance = data.filter(d=> (new Date(d.date)).toDateString == new Date(`${year}-${month+1}-${dayOfMonth}` ) )?.[0]

      const dayString = `
        <popup-open for="date-%%DAY%%" class="date">%%DAY%%</popup-open>
<popup-window id="date-${day}">
    <div class="popup-top">
        <h2>
            Day %%DAY%% || %%DATE%%
        </h2>
    </div>
   ${attendance ? `
    
     <div class="attendance">
        <h3>Attendance Logs</h3>

        <div>
            <div class="time checkin">
                <h4>check in</h4>
                <time datetime="${attendance.checkIn}">%%${attendance.dispatch}%%</time>
                
            </div>
            <div class="time dispatch">
                <h4>dispatched</h4>
                <time datetime="%%TIME%%">%%DTIME%%</time>
            </div>
        </div>
    </div>
    
    `: 
    `<form action="/pharmacy/staff/attendance?id=${pharmacyId}&uid=${userId}" method="post" data-type="create">
        <h3>Mark Attendance</h3>


        <div>

            <div class="time checkin">
                <label>
                    <h4>check-in Time</h4>
                    <input type="time" name="checkIn">
                </label>
            </div>
            <div>
                <label>
                    <h4>Dispatch Time</h4>
                    <input type="time" name="checkIn">
                </label>
            </div>

        </div>

        <input type="reset" value="Clear">
        <input type="submit" value="Save Changes">

    </form>`}

    ${attendance?.checkIn ? `
        <form action="/pharmacy/staff/attendance?id=${pharmacyId}&uid=${userId}&date=${attendance.date}" method="post" data-type="update">
        <h3>Update Attendance</h3>


        <div>

            <div class="time checkin">
                <label>
                    <h4>check-in Time</h4>
                    <input type="time" name="checkIn">
                </label>
            </div>
            <div>
                <label>
                    <h4>Dispatch Time</h4>
                    <input type="time" name="checkIn">
                </label>
            </div>

        </div>

        <input type="reset" value="Clear">
        <input type="submit" value="Save Changes">

    </form>
        
        `:' '}

</popup-window>`;

        days.push(dayString);
    }

    return days;

}