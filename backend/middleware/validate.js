const Joi = require('joi')

const createTodoSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty' : 'Title cannot be empty',
      'string.min'   : 'Title must be atleast 1 character',
      'string.max'   : 'Title can be atmost 100 characters',
      'any.required' : 'Title is required'
    }),
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .default('medium')
    .messages({
      'any.only': 'Priority must be low, medium or high'
    }),
  completed: Joi.boolean()
})

const updateTodoSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .messages({
      'string.empty' : 'Title cannot be empty',
      'string.min'   : 'Title must be atleast 1 character',
      'string.max'   : 'Title can be atmost 100 characters',
    }),
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .messages({
      'any.only': 'Priority must be low, medium or high'
    }),
  completed: Joi.boolean().truthy('true').falsy('false')  // ← handles string booleans
})

const validateCreate = (req, res, next) => {
  const { error, value } = createTodoSchema.validate(req.body, {
    abortEarly: false
  })
  if (error) {
    const errors = error.details.map(detail => detail.message)
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    })
  }
  req.body = value
  next()
}

const validateUpdate = (req, res, next) => {
  const { error, value } = updateTodoSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  })
  if (error) {
    // Log the exact error to see what's failing
    console.log('Validation error:', error.details)
    const errors = error.details.map(detail => detail.message)
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    })
  }
  req.body = value
  next()
}

module.exports = { validateCreate, validateUpdate }