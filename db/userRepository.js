var User = require("../models/user");

async function save(memberId, name){
    var instance = new User({
        memberId: memberId,
        name: name
    });
    await instance.save();
}

async function findUserById(memberId){
    return await User.findOne({memberId: memberId});
}

async function getAll(){
    return await User.find({});
}

module.exports= {
    save,
    findUserById,
    getAll
}