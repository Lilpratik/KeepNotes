import { useState } from 'react'
import API from '../api/axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    displayName: '',
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
      await API.post('v1/register', formData)

      toast.success('Registration successful')

      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='auth-page'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <input
          type='text'
          name='displayName'
          placeholder='Name'
          onChange={handleChange}
          required
        />

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

        <button type='submit'>Register</button>

        <p>
          Already have account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register