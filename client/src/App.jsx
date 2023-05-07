import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import './App.css'

import { ToastContainer } from 'react-toastify'; // then this
import 'react-toastify/dist/ReactToastify.min.css' // import first


function App() {
  return (
    <Router>
      <div className="container">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      <ToastContainer />
  
      </div>
    </Router>

    
  )
}

export default App
