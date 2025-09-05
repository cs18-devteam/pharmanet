const Leaves = require("../models/LeaveModel")

exports.createLeave = async (req , res)=>{
    const newLeave = await Leaves.save({
        name : "my leave",
        email :"myemail@gmail.com",
        time :"2023-05-01"

    })


}


exports.getLeaves = async (req , res)=>{
    const allLeaves = await Leaves.get();

}


exports.updateLeaves = async (req , res)=>{
    const updatedLeave = await Leaves.update({
        id:2,
        name:"others leave"
    })
    console.log(updatedLeave);
}


exports.deleteLeaves = async (req , res)=>{
    const deleteLeave = await Leaves.deleteById(1);
    console.log(deleteLeave);

}