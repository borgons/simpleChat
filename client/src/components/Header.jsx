import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const dispatch = useDispatch()
  const { admin } = useSelector((state) => state.auth)

  const onLogout = () => {
    
    dispatch(logout())
    dispatch(reset())
  }

  return (
    <>
      <header className='header'>
      <Navigate to='/' />Add Contacts
      <ul>
        {admin ? (
          <li>
            <button className='btn' onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Navigate to='/login' /> Login

            </li>
            <li>
              <Navigate to='/register' /> Register
            </li>
          </>
        )}
      </ul>
    </header>
      </>
  )
}

export default Header