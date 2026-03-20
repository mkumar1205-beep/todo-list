//To render the list of todos
import TodoItem from './TodoItem'

const TodoList=({todos, onUpdate, onDelete}) => {
  if(todos.length === 0)
  {
    return <p className='empty'>No todos yet.Add one!</p>
  }

  return(
    <div className='todo-list'>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
      ))}
    </div>
  )
}

export default TodoList