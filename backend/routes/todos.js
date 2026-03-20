const express = require('express')

const router = express.Router()

const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController')

const {validateCreate, validateUpdate} = require('../middleware/validate')

const protect = require('../middleware/protect')

router.use(protect)

router.route('/')
 .get(getAllTodos)
 .post(validateCreate, createTodo) //First validate,then create

router.route('/:id')
 .get(getTodo) 
 .put(updateTodo)
 .delete(deleteTodo)

module.exports = router