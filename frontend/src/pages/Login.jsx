import { useState } from 'react'
import API from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await API.post('v1/login', formData)

      localStorage.setItem('token', data.token)

      setUser(data)

      toast.success('Login successful')

      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='auth-page'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>

        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />

        <button type='submit'>Login</button>

        <p>
          No account? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login