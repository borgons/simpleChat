import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chatService from './chatService'

const initialState = {
  chats: [],
  contacts:[],
  isError: false, 
  isSuccess: false, 
  isLoading: false, 
}

export const addContacts = createAsyncThunk(
  'routes/api/message/addContact',
  async(contactData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await chatService.addContact(contactData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getChats = createAsyncThunk(
  'routes/api/message/chats',
  async(contactNameData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await chatService.getChats(contactNameData,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getContacts = createAsyncThunk(
  'routes/api/message/contacts',
  async(_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await chatService.getContacts(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const createChat = createAsyncThunk(
  'routes/api/message/send',
  async (chatData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await chatService.sendChat(chatData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteChat = createAsyncThunk(
  'routes/api/message/deleteChat/:id',
  async (chatData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await chatService.deleteChat(chatData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false,
      state.isSuccess = false,
      state.isError = false,
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
    //createChat
    .addCase(createChat.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createChat.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.chats.push(action.payload)
    
    })
    .addCase(createChat.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.chats = action.payload
    })
    // addContacts
    .addCase(addContacts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(addContacts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.contacts.push(action.payload)
    })
    .addCase(addContacts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.contacts = action.payload
    })
    // getCOntacts
    .addCase(getContacts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getContacts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.contacts = action.payload
    })
    // getChats
    .addCase(getChats.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getChats.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.chats = action.payload
    })
    //deleteChats
    .addCase(deleteChat.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteChat.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.chats = state.chats.filter(
        (chat) => chat._id !== action.payload.id
      )
    })
    .addCase(deleteChat.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.chats = action.payload
    })
  },
})








export const { reset } = chatSlice.actions
export default chatSlice.reducer
