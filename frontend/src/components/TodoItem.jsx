//For a single todo
import api from '../api/axios'

const TodoItem = ({todo, onUpdate, onDelete}) => {
  const handleToggle = async() => {
    try {
      const response = await api.put(`/todos/${todo._id}`,{
      completed: !todo.completed
    })
    console.log('Response:', response.data)
    onUpdate(response.data.data)
  }

  catch(err)
  {
    console.error('Failed to update todo', err)
  }
}
const handleDelete = async() => {
  try {
    await api.delete(`/todos/${todo._id}`)
    onDelete(todo._id)
  }

  catch(err)
  {
    console.error('Failed to delete todo', err)
  }
}
return(
  <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
    <div className='todo-left'>
      <input type='checkbox' checked={todo.completed} onChange={handleToggle}/>

      <div>
        <p className='todo-title'>{todo.title}</p>
        <span className={`priority ${todo.priority}`}>{todo.priority}
        </span>
      </div>
    </div>
    <button className='delete-btn' onClick={handleDelete}>Delete</button>
  </div>
)
}

export default TodoItem