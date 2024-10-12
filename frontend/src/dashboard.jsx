import axios from "axios"
import { useEffect,useContext } from "react"
const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true
import {AuthContext} from './context'
const Dashboard = () => {
  
    const { user, loggedIn, checkLoginState } = useContext(AuthContext)
    useEffect(() => {
      ;(async () => {
        if (loggedIn === true) {
          try {
            // Get posts from server
            const {
  
              data : { posts },
            } = await axios.get(`${serverUrl}/user/posts`)
          } catch (err) {
  
            console.error(err)
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
  
        console.error(err)
      }
    }
  
    return (
  
      <>
  
        <h3>Dashboard</h3>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
        <h4>{user?.name}</h4>
        <br />
        <p>{user?.email}</p>
        <br />
        <img src={user?.picture} alt={user?.name} />
        <br />
  
      </>
    )
  }


export default Dashboard