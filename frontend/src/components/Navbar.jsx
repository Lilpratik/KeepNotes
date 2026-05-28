import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  return (
    <div className='navbar'>
      <div className='logo'>
        <StickyNote2Icon />
        <h2>NotesFlow</h2>
      </div>

      <div className='nav-right'>
        <div className='profile'>
          <AccountCircleIcon />
          <span>{user?.displayName}</span>
        </div>

        <button
          className='logout-btn'
          onClick={() => {
            logout()
            navigate('/login')
          }}
        >
          <LogoutIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar