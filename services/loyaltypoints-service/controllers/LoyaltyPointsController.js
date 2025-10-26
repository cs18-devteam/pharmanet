const LoyaltyPoints = require("../models/LoyaltyPointsModel");

exports.createLoyaltyPoints =async (req , res)=>{
    const newLoyaltyRow = await LoyaltyPoints.save({
        name:"chathura",
        date: Date.now().toLocaleString(),
    });

    res.write(JSON.stringify(newLoyaltyRow));
    res.end();
}

exports.getLoyaltyPoints =async (req , res)=>{
    const newLoyaltyRow = await LoyaltyPoints.save({
        name:"chathura",
        date: Date.now().toLocaleString(),
    });

    res.write(JSON.stringify(newLoyaltyRow));
    res.end();
}

exports.updateLoyaltyPoints =async (req , res)=>{
    const newLoyaltyRow = await LoyaltyPoints.save({
        name:"chathura",
        date: Date.now().toLocaleString(),
    });

    res.write(JSON.stringify(newLoyaltyRow));
    res.end();
}

exports.deleteLoyaltyPoints =async (req , res)=>{
    const newLoyaltyRow = await LoyaltyPoints.save({
        name:"chathura",
        date: Date.now().toLocaleString(),
    });

    res.write(JSON.stringify(newLoyaltyRow));
    res.end();
}