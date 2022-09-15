import React,{useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Auth from '../../../hoc/auth'

function LandingPage() {
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  }, [])

  const onCLickHandler = () => {
    axios.get('/api/users/logout')
    .then(response =>{
      if(response.data.success) {
        navigate('/login')
      } else {
        alert('Failed to logout')
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <h1>LandingPage</h1>
      <button onClick={onCLickHandler}>Logout</button>
    </div>
  )
}

export default Auth(LandingPage, null)