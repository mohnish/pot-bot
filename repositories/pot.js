import Pot from '../models/pot.js'

async function save(data) {
  const pot = new Pot(data);
  return await pot.save();
}

async function getAllBy(condition) {
  return await Pot.find(condition);
}

async function getBy(condition) {
  return await Pot.findOne(condition);
}

async function update(pot) {
  return await Pot.updateOne({ potId: pot.potId }, pot);
}

export {
  save,
  getAllBy,
  getBy,
  update
}
