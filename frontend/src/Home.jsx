import React from 'react'
import { AuthContext } from './context'
import Dashboard from './dashboard'
import Login from './login'


const Home = () => {
    const { loggedIn } = React.useContext(AuthContext)

    if (loggedIn === true) return <Dashboard />
    if (loggedIn === false) return <Login />
    return <></>

}


export default Home;