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
  return await Pot.updateOne({ _id: pot._id }, pot);
}

async function destroy(potId) {
  return await Pot.deleteOne({ _id: potId });
}

export {
  save,
  getAllBy,
  getBy,
  update,
  destroy,
}
