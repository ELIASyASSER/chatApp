import  { useContext,useRef,useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./context"
import axios  from "axios"
const serverUrl = import.meta.env.VITE_SERVER_URL

const Callback = () => {
    const called = useRef(false)
    const { checkLoginState, loggedIn } = useContext(AuthContext)
    const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
    useEffect(() => {

      ;(async () => {
        if (loggedIn === false) {
          try {
            setLoading(true)
            if (called.current) return // prevent rerender caused by StrictMode
            called.current = true
            const res = await axios.get(`${serverUrl}/auth/token${window.location.search}`)
            console.log('response: ', res)
            checkLoginState()
            navigate('/')
            setLoading(false)

          } catch (err) {
            console.error(err)
            setLoading(false)
            navigate('/')
          }
        } else if (loggedIn === true) {
          setLoading(false)
          navigate('/')
        }
      })()
    }, [checkLoginState, loggedIn, navigate])
    if(loading){

      return <div className="text-7xl text-center flex justify-center items-center ">loading ...</div>
    
    }

  }
  
export default  Callback