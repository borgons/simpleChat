import axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 

const API_URL_CHAT = 'http://localhost:6001/routes/api/message'

const getChats = async (contactNameData = '', token) => {

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL_CHAT + `/chats?contactNameMsg=${contactNameData}`,  config)
    
    return response.data
  
  } catch (err) {
    console.log(err)
  }
}


const getContacts  = async (token) => {

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL_CHAT + '/contacts',  config)
    
    return response.data
  
  } catch (err) {
    console.log(err)
  }
}

const addContact = async (contactData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL_CHAT + '/addContact', contactData, config)

    toast.success(response.data.msg,{
      theme: 'dark',
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    return response.data
    
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
const sendChat = async (chatData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL_CHAT + '/send', chatData, config)
    
    toast.success(response.data.msg,{
      theme: 'dark',
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    return response.data

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


const deleteChat = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL_CHAT + '/deleteChat/' + id, config)
  
    console.log('Deleted')
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const chatService = {
  deleteChat,
  sendChat,
  getChats,
  getContacts,
  addContact
}

export default chatService