const db = require("../data/db-config")
const mappers = require('../data/mappers')

module.exports = {
  get,
  getById,
  add,
}

function get() {
  return db("projects")
    .select()
      .then(projects => {
        return projects.map(project => mappers.projectToBody(project))
      })
}

async function getById(id) {
  const projectList = await db('projects').where(id, id)
  const project = projectList.map(project => mappers.projectToBody(project))
  const resources = await db('resources')
  const taskList = await db('tasks').where(id, id)
  const tasks = taskList.map(task => mappers.taskToBody(task))
  const mapping = await db('projects_resources')
  const rtnList = project.map(indProject => {
    const resourceList = mapping.filter(({project_id}) => project_id === indProject.id).map(({resource_id}) => resource_id)
    const rtnResource = resourceList.map(resource => resources.filter(({id}) => id === resource)[0])
    
  
    return {
      ...indProject,
      tasks,
      resources: rtnResource,
    }
  })
  return rtnList
}

function add(project) {
  return db("projects")
    .insert(project)
      .then(ids => {
        return getById(ids[0])
      })
}

 
