import axios from "axios"
import { useEffect,useContext, useState } from "react"
import {useNavigate,useParams} from 'react-router-dom'

const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

import {AuthContext} from './context'
import User from "./components/users"
import Header from "./components/header"


const Dashboard = () => {
    
    const { user, loggedIn, checkLoginState ,users,setUsers,userInfo,setUserInfo} = useContext(AuthContext)
    useEffect(() => {

      ;(async () => {
        if (loggedIn === true) {
          try {
            // Get posts from server
            const {data:{users}} =  await axios.get(`${serverUrl}/user/people`)
            setUsers(users)
            
          } catch (err) {
  
            console.error(err.message)
          }
        }
      })()
    }, [loggedIn])

    const handleLogout = async () => {
  
      try {
  
        await axios.post(`${serverUrl}/auth/logout`)
        // Check login state again
        checkLoginState()
      } catch (err) {
  
        console.error(err.message)
      }
    }
    return (<main>
      <Header handleLogout={handleLogout}/>
      <section className="people my-5 ">
      <h1 className="font-sans font-thin mt-0   mb-8 ml-4 text-7xl">friends</h1>
        {


            users.filter(person=>person.email !== user.email)

            .map((person,idx)=>{

              return <User key={idx} person={person}/> 
            
            })
        }

      </section>
      </main>

    )

  }

export default Dashboard