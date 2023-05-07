import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getChats,  reset } from '../features/chats/chatSlice'
import { logout } from '../features/auth/authSlice'
import ChatItems from '../components/ChatItems';
import ChatBox from '../components/ChatBox';

import MdlAddContacts from '../components/MdlAddContacts'

import Spinner from '../components/Spinner';

function Dashboard() {

  const initialSearch = {
    contactName: ''
  }


  const [search, setSearch] = useState(initialSearch);

  // const [submitted, setSubmitted] = useState(false);

  const chats = useSelector(state => state.chats)
  const { admin, isLoading, isError, message } = useSelector((state) => state.auth)

  
  const navigate = useNavigate()
  const dispatch = useDispatch()


  if (isLoading) {
    return <Spinner />
  }

  const initFetch = useCallback(() => {
    dispatch(getChats());
  }, [dispatch])

  const initReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!admin) {
      navigate('/login')
    }

    initFetch()

    initReset()

    return () => {
      dispatch(reset())
    }
  }, [admin, navigate, isError, message, initFetch, initReset])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value})
  }

  const onSubmit =  (e) => {
    e.preventDefault()

    const { contactName } = search;
    dispatch(getChats(contactName))
  }

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {admin && admin.name}</h1>
        <p>Welcome ChatRoom</p>
      </section>

      <section className="searching">
        <form onSubmit={onSubmit}>
            <div className="input-group mb-3 w-50 m-auto">
              <input 
                type="text" 
                className="form-control" 
                id="contactName"
                name="contactName"
                onChange={handleInputChange}
                placeholder="Recipient's username" 
                aria-label="Recipient's username" 
                aria-describedby="button-addon2" 
                />
              
              <button className="btn btn-primary" type="submit" id="button-addon2" ><i className="bi bi-search"></i></button>
            </div>
        </form>
        <button className="btn btn-danger" onClick={() => onLogout()} id="button-addon2" ><i className="bi bi-box-arrow-left"></i></button>
      </section>
      
      <section className="adding">
        <button type="button" className="btn btn-success m-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i className="bi bi-person-add me-2"></i> Add Contacts
        </button>
      </section>

      <section className='content w-50 m-auto mb-5'>
        <ul className="list-group ">
            <li className="list-group-item active mb-3" aria-current="true">Message...</li>
          {chats.chats.length > 0 ? (
            <div className='messages'>
              {chats.chats.map((chat, index) => (
                <ChatItems chat={chat} />
              ))}
            </div>
          ) : (
            <h5>You have dont have chats yet</h5>
          )}
        </ul> 
      </section>

      
      <ChatBox />
      <MdlAddContacts/>
    </>
  )

}

export default Dashboard