const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
  {
    title: {
      type : String,
      required : true,
      trim : true
    },
    completed: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum:['low', 'medium', 'high'],
      default: 'medium'
     }
    },
    {
      timestamps: true
    }
)

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo