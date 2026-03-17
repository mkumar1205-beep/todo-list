const Joi = require('joi')

const todoSchema = Joi.object({
  title: Joi.string()
   .min(1)
   .max(100)
   .required()
   .messages({
    'string.empty' : 'Title cannot be empty' , 
    'string.min'   : 'Title must be atleast 1 character',
    'string.max'   : 'Title can be atmost 100 characters',
    'any.required' : 'Title is required'
   }),

   priority: Joi.string()
   .valid('low' , 'medium' , 'high')
   .default('medium')
   .messages({
    'any.only': 'Priority must be low, medium or high'
   }),

   completed: Joi.boolean()
   })

//Middleware function
const validateTodo = (req, res, next) => {
  const {error, value} = todoSchema.validate(req.body, {abortEarly: false})

  if(error) {
    const errors = error.details.map(detail => detail.message)

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    })
  }

  req.body = value

  next()
}

module.exports = validateTodo