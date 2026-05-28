import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position='top-right' />

        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />

          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App