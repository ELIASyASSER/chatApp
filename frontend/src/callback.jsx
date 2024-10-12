import { useContext,useRef,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./context"
import axios  from "axios"
const serverUrl = import.meta.env.VITE_SERVER_URL

const Callback = () => {
    const called = useRef(false)
    const { checkLoginState, loggedIn } = useContext(AuthContext)
    const navigate = useNavigate()
  
    useEffect(() => {
      ;(async () => {
        if (loggedIn === false) {
          try {
            if (called.current) return // prevent rerender caused by StrictMode
            called.current = true
            const res = await axios.get(`${serverUrl}/auth/token${window.location.search}`)
            console.log('response: ', res)
            checkLoginState()
            navigate('/')
          } catch (err) {
            console.error(err)
            navigate('/')
          }
        } else if (loggedIn === true) {
          navigate('/')
        }
      })()
    }, [checkLoginState, loggedIn, navigate])
    return <></>
  }
  
export default  Callback