import { useState, useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register , reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

import { ToastContainer,toast } from 'react-toastify'; // then this
import 'react-toastify/dist/ReactToastify.min.css' // import first

function Register() {

  const initialRegisterState = {
      name:'',
      email:'',
      password:'',
      password2:''
  }

  const [newAdmin, setNewAdmin] = useState(initialRegisterState);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError) {
      toast.error(message)
    } 

    if (isSuccess || admin) {
      navigate('/')
      console.log(isSuccess)
    } else {
      navigate('/register')
    }

    dispatch(reset())
  }, [admin, isError, isSuccess, message, navigate, dispatch])


  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { name, email, password, password2 } = newAdmin; 

    if (password !== password2) {
      toast.error('Passwords do not match',{
        theme: 'dark',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } 

    dispatch(register(newAdmin))
    // console.log(newAdmin)
    
    .then(data => {
      console.log(data);
      setNewAdmin({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
    .catch(err => {
      console.log(err);
    })

  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <ToastContainer/>
      <section className="heading  mb-3">
        <h1 className="m-auto">
          Register Now 
        </h1>
      </section>

      <section>
        <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
            <input 
              type="text" 
              name="name"
              value={newAdmin.name || ''}
              className="form-control" 
              id="exampleFormControlInput1" 
              onChange={handleInputChange}
              placeholder="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Email address</label>
            <input 
              type="email" 
              name="email"
              value={newAdmin.email || ''}
              className="form-control" 
              id="exampleFormControlInput2" 
              onChange={handleInputChange}
              placeholder="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              value={newAdmin.password || ''}
              className="form-control" 
              id="exampleFormControlInput3" 
              onChange={handleInputChange}
              placeholder="password" 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput4" className="form-label">Password Confirmation</label>
            <input 
              type="password" 
              name="password2" 
              value={newAdmin.password2 || ''}
              className="form-control" 
              id="exampleFormControlInput4" 
              onChange={handleInputChange}
              placeholder="password" 
            />
          </div>
          <button type="aubmit" className="btn btn-primary">Submit</button> 
        </form>
      </section>
    </>
  )
}

export default Register