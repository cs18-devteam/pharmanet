const fs = require('fs');
const path = require('path');
const allStaffMembersTemplate = fs.readFileSync(path.join(__dirname , './../templates/allStaff.template.html'), 'utf-8');


exports.renderAllStaffMembers = (req , res)=>{
    res.send(allStaffMembersTemplate);
}