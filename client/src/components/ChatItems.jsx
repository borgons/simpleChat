import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteChat } from '../features/chats/chatSlice'



function ChatItems({ chat }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const initFetch = useCallback(() => {
  //   dispatch(getChats());
  // }, [dispatch])

  // const initDeleteFetch = useCallback(() => {
  //   dispatch(deleteChat(chat._id))
  // }, [dispatch])

  const removeChat = () => {
    dispatch(deleteChat(chat._id))
    window.location.reload()
  }

  return (
    <div className="messages">
          <li className="list-group-item">
            <div className="d-flex flex-row justify-content-between">
              <div>
                <b>{chat.contactNameMsg} </b>
                <br />
                  {chat.chats && Object.values(chat.chats).map((chatm, index) => (
                      <p key={index}>{chatm}</p> 
                  ))}
              </div>
              <div>
                <button onClick={() => removeChat()} className='btn btn-danger ms-5'>
                  X
                </button>

              </div>
            </div>
          </li>
          
    </div>
  )
}

export default ChatItems