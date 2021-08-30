import User from '../models/user.js';

async function save(memberId, name){
    var instance = new User({
        memberId: memberId,
        name: name
    });
    await instance.save();
}

async function getBy(attr, value){
    var filter={};
    if(attr){
        filter[attr]=value;
    }
    return await User.findOne(filter);
}

async function getAllBy(attr, value){
    var filter={};
    if(attr){
        filter[attr]=value;
    }
    return await User.find({});
}

async function update(user){
    return await User.updateOne({"memberId": user.memberId}, user);
}

export {
    save,
    getBy,
    getAllBy,
    update
}