require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const todoRoutes=require('./routes/todos')
const authRoutes=require('./routes/auth')
const app=express()

app.use(cors())

app.use(express.json())

app.use('/api/todos', todoRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req,res) => {
  res.send('Todo API is running...')
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!')
    app.listen(PORT , () => console.log(`Server running on PORT ${PORT}`))
  })
  .catch((err) => {
    console.log('MongoDB connection failed' , err.message)
  })