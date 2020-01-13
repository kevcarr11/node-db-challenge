const express = require('express')
const projects = require('./project.module')
const tasksRouter = require('../tasks/tasks-router')

const router = express.Router()

router.use('/:id/tasks', tasksRouter)

router.get('/', (req, res) => {
  projects.get()
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to get projects" })
    })
})

router.get('/:id', async (req, res) => {
  try {
    const [project] = await projects.getById({id: req.params.id})
    res.json(project)
  } catch (err) {
    res.status(500).json({ error, message: "An error occurred try again" })
  }
})

router.post('/', (req, res) => {
  const projectData = req.body
  
  projects.add(projectData)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to create project" })
    })
})



module.exports = router