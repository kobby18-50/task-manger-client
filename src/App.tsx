import { Routes, Route} from 'react-router-dom'
// import HomePage from './pages/HomePage'
import EditTask from './pages/EditTask'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Register from './pages/Register'



function App() {
 

  return (
    <>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/dashboard' element={<HomePage/>} />
      <Route path="/edit/:slug" element={<EditTask/>}/>
    </Routes>
    </>
  )
}

export default App
