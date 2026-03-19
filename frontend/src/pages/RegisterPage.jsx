import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import api from '../api/axios'

const RegisterPage = () => {
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('') 
  const [loading, setLoading] = useState(false) 

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const response = await api.post('/auth/register', {
        name, email, password
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      navigate('/todos')
    }

    catch(err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }

    finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <h1>Register</h1>

      {error && <p className='error'>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name'
          />
        </div>

        <div className='field'>
          <label>Email</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@gmail.com'
          />
        </div>

        <div className='field'>
          <label>Password</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder='Minimum 6 characters'
          />
        </div>

        <button type='submit' disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button> 
      </form>

      <p>Already have an account? <Link to ='/login'>Login</Link></p>
    </div>
  )
}

export default RegisterPage