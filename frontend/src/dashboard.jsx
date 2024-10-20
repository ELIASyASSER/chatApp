import axios from "axios"
import { useEffect,useContext, useState } from "react"
const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true
import {AuthContext} from './context'
import User from "./components/users"
import Header from "./components/header"


const Dashboard = () => {
    
    const { user, checkLoginState ,users,setUsers} = useContext(AuthContext)
    useEffect(() => {

      ;(async () => {
          try {
            // Get posts from server
            const {data:{users}} =  await axios.get(`${serverUrl}/user/people`)
            setUsers(users)
            
          } catch (err) {
  
            console.error(err.message)
          }
      })()
    }, [])

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