const db = require('../data/db-config')
const mappers = require('../data/mappers')

module.exports = {
  getProjectTasks,
  getProjectTasksById,
  addProjectTasks,
}
function getProjectTasks(projectId) {
  return db("tasks")
    .join("projects", "projects.id", "tasks.project_id")
    .where({ project_id: projectId })
    .select(["tasks.id", "tasks.description", "tasks.notes", "tasks.completed", "projects.id as projectId", "projects.name as project,"])
      .then(tasks => {
        return tasks.map(task => mappers.projectToBody(task))
      })
}

function getProjectTasksById(projectId, id) {
  return db("tasks")
    .where({ id, project_id: projectId })
    .first()
}

async function addProjectTasks(task, projectId) {
  const data = { project_id: projectId, ...task }
  const [id] = await db('tasks').insert(data)

    return getProjectTasksById(projectId, id)
}

