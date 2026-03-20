//Form to add new todos
import {useState} from 'react'
import api from '../api/axios'

const TodoForm = ({onAdd}) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')

  const handleSubmit=async(e) => {
    e.preventDefault()

    try {
      setError('')
      const response=await api.post('/todos', {title, priority})
      onAdd(response.data.data)
      setTitle('')
      setPriority('medium')
    }

    catch(err)
    {
      setError(err.response?.data?.message || 'Failed to add todo')
    }
  }
  return(
    <form className='todo-form' onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Add a new todo...'/>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>
      </select>
      <button type='submit'>Add</button>
    </form>
  )
}

export default TodoForm