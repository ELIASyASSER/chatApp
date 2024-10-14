import axios from "axios"
import { useEffect,useContext, useState } from "react"
import img from './assets/USER.jpg'
import {useNavigate} from 'react-router-dom'

const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true
import {AuthContext} from './context'
const Dashboard = () => {
    const navigate = useNavigate()
    const { user, loggedIn, checkLoginState } = useContext(AuthContext)
    const [users,setUsers] = useState([])
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
  const chat =()=>{
    navigate('/chat')
  }
    return (<main>
      <section className="bg-gradient-to-r from-blue-300 to-green-600   w-full m-auto p-4 rounded-md flex items-center justify-between">
          <button>
          <img src={user?.picture} alt={user?.name} className="rounded-full"/>
          </button>
          <div className="ml-10  flex-1 ">        
              <h4>Welcome,<span className="font-bold"> {user?.name}</span></h4>
              <p className="font-extrabold">Email: <span className="font-mono">{user?.email}</span></p>
          </div>
          <button className="bg-black text-white ml-4 p-3 rounded-full font-bold" onClick={handleLogout}>
          Logout
        </button>
      </section>

      <section className="people my-5 ">
        
        {
          users.map((user,idx)=>{
            let now = new Date()
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let formattedDate = now.getDate()  + "-" + months[now.getMonth()] + "-" + now.getFullYear()
            const date = formattedDate
            
            const picture = user.picture ||img
            return <div key={idx} onClick={chat} className="flex justify-between items-center p-5 rounded-2xl bg-[#f0e9ec] cursor-pointer hover:bg-[#d6d0d0] transition-[0.4s]">
            <div className="flex items-center">
                <img src={picture || img} className="rounded-full w-[80px] border border-black border-2" alt="" />
                <div className="ml-4  flex-1">
                  <p className=" font-bold text-[18px]">{user.name}</p>
                  <p className="text-[#777] font-mono mt-2">last message here</p>
                </div>
            </div>
            
            <time className="font-medium">

              {
                date
              }
            </time>
  
          </div>
          
            
          })
        }

      </section>
      </main>
    )
  }


export default Dashboard