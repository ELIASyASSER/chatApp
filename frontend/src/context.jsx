import { createContext,useState,useCallback,useEffect } from "react"
import axios from "axios"
// Ensures cookie is sent
axios.defaults.withCredentials = true
const serverUrl = import.meta.env.VITE_SERVER_URL

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const checkLoginState = useCallback(async () => {
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await axios.get(`${serverUrl}/auth/logged_in`)
      setLoggedIn(logged_in)
      user && setUser(user)
    } 
    
    catch (err) {
      console.error(err)
    }
  }, [])



  useEffect(() => {

    checkLoginState()
  }, [checkLoginState])

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user ,users,setUsers}}>
      {children}
    </AuthContext.Provider>
  )

}
