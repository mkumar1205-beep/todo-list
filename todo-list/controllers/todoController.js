const Todo = require('../models/Todo')

const getAllTodos = async (req, res) => {
  try{

    const {completed, priority} = req.query

    const validPriority=['low', 'medium', 'high']

    if(priority && !validPriority.includes(priority))
    {
      return res.status(400).json({
        success : false,
        message : 'Priority must be low, medium or high'
      })
    }

    const filter={}

    if(completed !== undefined)
    {
      filter.completed = completed === 'true' //Converting 'true' to bool true as req.query returns string
    }

    if(priority !== undefined)
    {
      filter.priority=priority
    }

    const todos = await Todo.find(filter)

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    })
  } catch(error){
    res.status(500).json({
      success : false,
      message: 'Server error',
      error: error.message
    })
  }
}

const getTodo = async (req, res) => {
  try{
    const todo = await Todo.findById(req.params.id)

    if(!todo) { 
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }

    res.status(200).json({
      success: true,
      data: todo
    })
  }

  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

const createTodo = async (req , res) => {
  try {
    const {title, priority} = req.body

    const todo = await Todo.create({
      title,
      priority
    })

    res.status(201).json({
      success: true,
      data: todo
    })
  }

  catch(error){
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

const updateTodo = async (req , res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new : true, runValidators: true
      }
    )

    if(!true) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }

    res.status(200).json({
      success: true,
      data: todo
    })
  }

  catch(error){
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)

    if(!todo) {
      return res.status(404).json({
        success : false,
        message: 'Todo not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    })
  }

  catch(error){
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
}