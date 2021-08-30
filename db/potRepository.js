import Pot from '../models/pot.js'

async function save(pot) {
  const instance = new Pot(pot);
  await instance.save();
}

async function getAllBy(attr, value) {
  const filter = {};

  if (attr) {
    filter[attr] = value;
  }

  return await Pot.find(filter).exec();
}

async function getBy(attr, value) {
  const filter = {};

  if (attr) {
    filter[attr] = value;
  }

  return await Pot.findOne(filter);
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
