const express = require('express')

const router = express.Router()

const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController')

const validateTodo = require('../middleware/validate')

router.route('/')
 .get(getAllTodos)
 .post(validateTodo, createTodo) //First validate,then create

router.route('/:id')
 .get(getTodo) 
 .put(validateTodo, updateTodo)
 .delete(deleteTodo)

module.exports = router