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
  const {messages,setMessages} = useContext(AuthContext)
  
  const navigate = useNavigate()
  const {id1,id2} = useParams()

  
  // Fetch old messages when entering the chat
  const fetchMessages = useCallback(async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/${id1}/${id2}`);
      setMessages(data); // Set old messages from the backend
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    },[id1, id2,messages])

    useEffect(() => {
      fetchMessages(); // Fetch old messages on component mount
    },[id1, id2, messages, fetchMessages])


  const back = ()=>{
    navigate("/")
  }

  return (
    <>
      <HeaderChat back={back} />
      <BodyOfChat/>
      <Footer/>
    </>

  )
}

export default Chat