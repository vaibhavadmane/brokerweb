
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from "react-router-dom"
import  Signin from './components/Footer/Footer.jsx'
import Login from './components/Login/Login.jsx'
import Card from './components/Card/Card.jsx'
import Home from './components/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
function App() {


  return (
    <>
     <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='signin' element={<Signin/>}/>
         <Route path='login' element={<Login/>}/>
         <Route path='createcard' element={<Card/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
