const db = require("../data/db-config")

module.exports = {
  get,
  getById,
  add,
}

function get() {
  return db('resources').select()
}

function getById(id) {
  return db('resources')
    .where({ id })
    .first()
}

async function add(resource) {
  const [id] = await db("resources").insert(resource)

  return getById(id)
  
}
