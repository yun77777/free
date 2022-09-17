import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './views/NavBar/NavBar'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import Footer from './views/Footer/Footer'

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar/>
      <Router>
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </div>
      </Router>
      <Footer/>
    </Suspense>
  )
}

export default App