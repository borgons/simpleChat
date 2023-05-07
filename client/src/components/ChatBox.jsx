import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContacts, createChat, getChats} from '../features/chats/chatSlice'

// import { ToastContainer,toast } from 'react-toastify'; // then this
// import 'react-toastify/dist/ReactToastify.min.css' // import first

function ChatBox() {

  const initialSendState = {
    contactNameMsg: '',
    chat: ''
  }

  const [send, setSend] = useState(initialSendState);

  const dispatch = useDispatch()
  

  const contacts = useSelector(state => state.chats)

  const initFetch = useCallback(() => {
    dispatch(getChats());
  }, [dispatch])


  const initFetchContacts = useCallback(() => {
    dispatch(getContacts())
  }, [dispatch])

  useEffect(() => {
    // if(isError){
    //   toast.error(message)
    // }

    // if(isSuccess) {
    //   toast.success(message)
    // }


  

    initFetchContacts()
  },[initFetchContacts])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSend({ ...send, [name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const {contactNameMsg, chat} = send;
    dispatch(createChat({contactNameMsg, chat}))

    initFetch()
  }


  return (
    <>
      <section className="m-auto w-50">
        <form onSubmit={onSubmit}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              <i className="bi bi-person-circle"></i>
            </label>
            {contacts.contacts && contacts.contacts.length > 0 ? (
              <select 
                className="form-select mb-3" 
                id="contactNameMsg"
                onChange={handleInputChange}
                name="contactNameMsg"
              >
                <option>Select person want to chat with</option>
                {contacts.contacts.map((contact, index) =>(
                  <option key={index} value={contact.contactName}>{contact.contactName}</option>
                ))}  
              </select>
            ):(
              <p>Dont have contacts names yet</p>
            )}
          </div>
          <div className="input-group mb-3">
            <textarea 
              className="form-control" 
              aria-label="With textarea"
              id="chat"
              name="chat"
              onChange={handleInputChange}>
            </textarea>
          </div>
          <button type="submit" className="btn btn-primary">
              Submit
          </button>
        </form>
      </section>


    </>
  )
}

export default ChatBox