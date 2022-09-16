import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'
import Auth from '../../../hoc/auth'

function RegisterPage() {
   // dispatch -> action
   const dispatch = useDispatch()
   const navigate = useNavigate()
 
     // props state
     // react hooks
     const [Email, setEmail] = useState("")
     const [Password, setPassword] = useState("")
     const [ConfirmPassword, setConfirmPassword] = useState("")
     const [Name, setName] = useState("")
     
     const onEmailHandler = (event) => {
       setEmail(event.currentTarget.value)
     }
 
     const onPasswordHandler = (event) => {
       setPassword(event.currentTarget.value)
     }

     const onConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
      setName(event.currentTarget.value)
    }
 
     const onSubmitHandler = (event) => {
       event.preventDefault()
      if(Password !== ConfirmPassword) {
        return alert('Password must be same as confirm password')
      }

       let body = {
         email: Email,
         name: Name,
         password: Password
       }
       
       dispatch(registerUser(body))
         .then(response => {
           console.log('response->', response)
           if(response.payload.success) {
             navigate('/')
           } else{
             alert('Error')
           }
         })
 
 
     }
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{ 
        display: 'flex', flexDirection: 'column'
      }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <label>Confrim Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        <br/>
        <button>
          Register
        </button>
      </form>
    </div>
  )
}

export default Auth(RegisterPage, false)