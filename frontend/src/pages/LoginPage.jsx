import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    //Prevent page refresh on form submit
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const response = await api.post('/auth/login', {email, password})

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      navigate('/todos')
    }

    catch(err) 
    {
      setError(err.response?.data?.message || 'Something went wrong')
    }

    finally
    {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      {error && <p className='error'>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label>Email</label>
          <input
             type='email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder='email@gmail.com'
            />
        </div>

        <div className='field'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter you password'
          />
        </div>

        <button type='submit' disabled={loading}>{loading ? 'Logging in ...' : 'Login'}</button>
      </form>

      <p>Don't have an account? <Link to = '/register'>Register</Link></p>
    </div>
  )
}

export default LoginPage