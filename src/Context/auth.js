import React, { createContext,useReducer } from 'react';

const initialState = {user:null};

if(localStorage.getItem('jwtToken'))
{
    const token = localStorage.getItem('jwtToken');
    initialState.user = token;
    console.log(initialState.user)
}


const AuthContext = createContext({
    user: null,
    login: (data) => { },
    logout: () => { }
})



const authReducer =(state, action)=>  {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state
    }

}

const AuthProvider =(props)=>
{
    const [state, dispatch] = useReducer(authReducer,initialState )
    const login=(userData)=>
    {
        localStorage.setItem('jwtToken',userData.token)    
        dispatch({type:'LOGIN',payload:userData})
        console.log(userData)
    }
    const logout=()=>
    {
        localStorage.removeItem('jwtToken')
        dispatch({type:'LOGOUT'})
    }
    return(
        <AuthContext.Provider  value={{user:state.user,login,logout}} {...props}  />
    )
}

export {AuthContext,AuthProvider}