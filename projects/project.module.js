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
  const resources = await db('resources')
  const taskList = await db('tasks')
  const mapping = await db('projects_resources')

  const project = projectList.map(project => mappers.projectToBody(project))
  const tasks = taskList.map(task => mappers.projectToBody(task))
  
  const rtnList = project.map(indProject => {
    const resourceList = mapping.filter(({project_id}) => project_id === indProject.id).map(({resource_id}) => resource_id)
    const rtnResource = resourceList.map(resource => resources.filter(({id}) => id === resource)[0])
    const rtnTasks = tasks.filter(({project_id}) => project_id === indProject.id)
    
    return {
      ...indProject,
      tasks: rtnTasks,
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

 
