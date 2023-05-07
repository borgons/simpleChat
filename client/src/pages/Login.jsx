import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

import { ToastContainer,toast } from 'react-toastify'; // then this
import 'react-toastify/dist/ReactToastify.min.css' // import first

function Login() {

  const initialLoginState = {
    email: '',
    password: ''
  }

  const [loginAdmin, setLoginAdmin] = useState(initialLoginState);


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || admin) {
      navigate('/')
    } else {
      navigate('/login')
    }


    dispatch(reset())
  }, [admin, isError, isSuccess, message, navigate, dispatch])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setLoginAdmin({ ...loginAdmin, [name]: value});
  }


  const onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = loginAdmin;

    console.log(email, password)
    dispatch(login(loginAdmin))
  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <ToastContainer />
        <section className="heading  mb-3">
          <h1 className="m-auto">
            Welcome to chatroom
          </h1>
        </section>

        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                name="email"
                value={loginAdmin.email || ''}
                className="form-control" 
                id="email" 
                placeholder="name@example.com" 
                onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type='password'
                name='password'
                value={loginAdmin.password || ''}
                className='form-control'
                id='password'
                placeholder='Enter password'
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </section>
    </>
  )
}

export default Login