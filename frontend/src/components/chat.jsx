import { useState,useEffect, useContext } from "react"
import { useParams,useNavigate} from "react-router-dom"
import axios from "axios"
import {AuthContext} from '../context'
import HeaderChat from "./headerChat"
import Footer from "./footer"
import BodyOfChat from "./BodyOfChat"
const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true
const Chat = (props) => {
  const navigate = useNavigate()
  const {loggedIn}  = useContext(AuthContext)
  const {id} = useParams()
  const [userInfo,setUserInfo] = useState()
  const back = ()=>{
    navigate("/")
  }
  useEffect(() => {
    (async()=>{
      try {
        const {data} = await axios.get(`${serverUrl}/user/${id}`)
        setUserInfo(data)
        
      } catch (error) {
        console.log(error.message);
      }
    })()
  },[loggedIn])
  
  
  return (
    <>
      <HeaderChat back={back} userInfo={userInfo}/>
      <BodyOfChat/>
      <Footer/>
    </>

  )
}

export default Chat