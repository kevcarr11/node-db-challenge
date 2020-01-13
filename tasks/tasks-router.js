const express = require('express')
const tasks = require('../tasks/tasks.module')

const router = express.Router({
  mergeParams: true,
})

router.get("/", (req, res) => {
  tasks.getProjectTasks(req.params.id)
    .then(task => {
      res.json(task)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to get tasks" })
    })
  })

router.post('/', (req, res) => {
  const payload = {
    description: req.body.description,
    notes: req.body.notes,
  }

  tasks.addProjectTasks(payload, req.params.id)
    .then(task => {
      res.status(201).json(task)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to create task" })
    })
})


module.exports = router