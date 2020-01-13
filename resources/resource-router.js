const express = require('express');
const resources = require('../resources/resource.module')

const router = express.Router()


router.get('/', (req, res) => {
  resources.get()
    .then(resource => {
      res.json(resource)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to get tasks" })
    })
})

router.post('/', (req, res) => {
  const resourceData = req.body

  resources.add(resourceData)
    .then(resource => {
      res.status(201).json(resource)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Failed to create resource" })
    })
})

module.exports = router
