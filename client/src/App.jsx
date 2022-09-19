import './App.css'
import LogIn from "./pages/LogIn/LogIn.jsx"
import Register from './pages/Register/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
function App() {

  return (
    <div className="App">
     <Router>
      <Routes>
        <Route index element={<LogIn/>}/>
        <Route path='/cadastro' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
     </Router>
    </div>
  )
}

export default App
