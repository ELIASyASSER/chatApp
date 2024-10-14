import React from 'react'
import { AuthContext } from './context'
import Dashboard from './dashboard'
import Login from './login'


const Home = () => {
    const { loggedIn,loading } = React.useContext(AuthContext)
    if(loading){
        return <div>loading ...</div>
    }
    
    if (loggedIn === true) return <Dashboard />
    if (loggedIn === false) return <Login />
    return <></>

}


export default Home;