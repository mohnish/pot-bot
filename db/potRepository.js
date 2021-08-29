const Pot = require("../models/pot");

async function save(pot){
    var instance = new Pot(pot);
    await instance.save();
}

async function getAllByStatus(status){
    return  await Pot.find({status: status}).exec();
}

async function getPotById(id){
    return await Pot.findOne({potId: id});
}

module.exports={
    save,
    getAllByStatus,
    getPotById
}