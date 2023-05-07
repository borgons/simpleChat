import axios from 'axios'

import { toast } from 'react-toastify'; // then this
import 'react-toastify/dist/ReactToastify.min.css' // import first



const API_URLADMIN ='http://localhost:6001/routes/api/admin'


//Register admin
const register = async (adminData)  => {
  
  try{
    const res = await axios.post(API_URLADMIN + '/register', adminData)

      if(res.data) {
        localStorage.setItem('admin', JSON.stringify(res.data))
      }

      toast.success("You are now registered",{
        theme: 'dark',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

        return res.data

  } catch(err) {
      toast.error(err.response.data.message,{
        theme: 'dark',
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    
  }
}

// Login admin
const login = async (adminData) => {
  try {
    const res = await axios.post(API_URLADMIN + '/login', adminData)

    if(res.data) {
      localStorage.setItem('admin', JSON.stringify(res.data))
    }

    toast.success(res.data.message,{
      theme: 'dark',
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  return res.data
  } catch (err) {
    toast.error(err.response.data.message,{
      theme: 'dark',
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    
  }
}

 // Logout user
const logout = () => {
  localStorage.removeItem('admin')
}

const authService = {
  register, 
  logout, 
  login
}

export default authService