import {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { addContacts } from '../features/chats/chatSlice'


function MdlAddContacts() {

  const dispatch = useDispatch()

  const initialAddContactState = {
    contactName: ''
  }

  const [ addContact, setAddContact] = useState(initialAddContactState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAddContact({ ...addContact, [name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const { contactName } = addContact;
    dispatch(addContacts({ contactName }))

    window.location.reload()
  }

  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Please add contacts here...</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                    <input 
                      type="text" 
                      id="contactName"
                      name="contactName"
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="Please add contact..."
                    />
                </div>
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-person-add me-2"></i> Add Contacts
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MdlAddContacts