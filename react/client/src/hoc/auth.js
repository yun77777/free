import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'
import {useNavigate} from 'react-router-dom'

/*
 option
 1. null: page that anyone can access
 2. true: page that user who logged in only can access
 3. false: page that user who logged in cannot access
*/

export default function (SpecificComponent, option, adminRoute = null) {
    
    function AuthenticationCheck() {
        const dispatch = useDispatch()
        const navigate = useNavigate()

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log('response -> ', response)

                // user has state not to login yet
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login')
                        // props.history.push('/login')
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin) {
                        // props.history.push('/')
                        navigate('/')
                    } else {
                        if(option === false) {
                            // props.history.push('/')
                            navigate('/')
                        }
                    }
                }
            })
        }, [])
        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}
