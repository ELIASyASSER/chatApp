import { useState,useEffect, useContext, useCallback } from "react"
import { useParams,useNavigate} from "react-router-dom"
import axios from "axios"
import {AuthContext} from '../context'
import HeaderChat from "./headerChat"
import Footer from "./footer"
import BodyOfChat from "./BodyOfChat"
const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true
const Chat = (props) => {
  const {setMessages,receiverId,setReceiverId} = useContext(AuthContext)
  const [lastActive,setLastActive] = useState("")
  const navigate = useNavigate()
  const {id1,id2} = useParams()
  useEffect(()=>{
    setReceiverId(id2)

  },[id2])

  // Fetch old messages when entering the chat
  const fetchMessages = useCallback(async () => {
    try {
      
      const { data:{messages} } = await axios.get(`${serverUrl}/${id1}/${id2}`);
      
      setMessages(messages); // Set old messages from the backend


    } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    },[id1,id2])

    useEffect(() => {
      fetchMessages()
      
      
      let interval = setInterval(() => {
        fetchMessages(); // Fetch old messages on component mount

      }, 6000);
      
      return ()=>{
        clearInterval(interval)
      }

    },[id1, id2, fetchMessages])

    

  const getLastTime =async ()=>{
    try {
      const {data:{lastActive:{lastActive}}} = await axios.get(`${serverUrl}/lastActive`,{
        params:{id:id2}
      })
      setLastActive(lastActive)

      } catch (error) {
      console.log(error);

    }
  }
  useEffect(()=>{
    getLastTime()
  },[id2])
  

  const back = ()=>{
    navigate("/")
  }
  return (
    <>
  
      <HeaderChat back={back}  lastActive={lastActive}/>
      <BodyOfChat/>
      <Footer/>
    </>

  )
}

export default Chat