const Pot = require("../models/pot");

async function save(pot){
    var instance = new Pot(pot);
    await instance.save();
}

async function getAllBy(attr, value){
    var filter={};
    if(attr){
        filter[attr]=value;
    }
    return await Pot.find(filter).exec();
}

async function getBy(attr, value){
    var filter={};
    if(attr){
        filter[attr]=value;
    }
    return await Pot.findOne(filter);
}

async function update(pot){
    return await Pot.updateOne({potId: pot.potId}, pot)
}

module.exports={
    save,
    getAllBy,
    getBy,
    update
}