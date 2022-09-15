import {
    LOGIN_USER
} from '../_actions/types'

export default function user (state={}, action) {
    console.log('ACTION -> ', action)
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        default:
            return state
    }
}