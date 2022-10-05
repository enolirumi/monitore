import './App.css'
import LogIn from "./pages/LogIn/LogIn.jsx"
import Register from './pages/Register/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Alimentos from './pages/Alimentos/Alimentos'

function App() {

  return (
    <div className="App">
     <Router>
      <Routes>
        <Route index element={<LogIn/>}/>
        <Route path='/cadastro' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/alimentos' element={<Alimentos/>}/>
      </Routes>
     </Router>
    </div>
  )
}

export default App
