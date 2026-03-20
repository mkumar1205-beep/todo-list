import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../api/axios'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const TodoPage=() => {
  const [todos, setTodos]=useState([])
  const [loading, setLoading]=useState(true)
  const [filter, setFilter]=useState('all')
  const navigate=useNavigate()

  const user=JSON.parse(localStorage.getItem('user'))

  useEffect(() => {fetchTodos()}, [])

  const fetchTodos=async() => {
    try {
      const response=await api.get('/todos')
      setTodos(response.data.data)
    }

    catch(err)
    {
      console.error('Failed to fetch todos', err)
    }

    finally
    {
      setLoading(false)
    }
  }

  const handleAdd=(newTodo) => {
    setTodos([newTodo, ...todos])
  }

  const handleUpdate=(updatedTodo) => {
    setTodos(todos.map(todo =>
      todo._id === updatedTodo._id ? updatedTodo : todo
    ))
  }

  const handleDelete=(deleteId) => {
    setTodos(todos.filter(todo => todo._id !== deleteId))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const filteredTodos= todos.filter(todo => {
    if(filter==='active') return !todo.completed
    if(filter==='completed') return todo.completed
    return true
  })

  if(loading) return <p>Loading...</p>

  return(
    <div className='todo-container'>
      <div className='todo-header'>
        <h1>My Todos</h1>
        <div className='header-right'>
          <span>Hi, {user?.name}!</span>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <TodoForm onAdd={handleAdd}/>

      <div className='filters'>
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')} 
        >
          All ({todos.length})
        </button>

        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}>
            Active({todos.filter(t => !t.completed).length})
        </button>

        <button className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}>
          Completed({todos.filter(t => t.completed).length})
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onUpdate={handleUpdate}
        onDelete={handleDelete}/>
    </div>
  )
}
export default TodoPage