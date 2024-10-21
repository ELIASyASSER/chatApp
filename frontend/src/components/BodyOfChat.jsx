import { useContext, useEffect } from "react"
import {AuthContext} from '../context.jsx'
import axios from "axios"
import {useParams}from 'react-router-dom'

const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

const BodyOfChat = () => {

  useEffect(()=>{
    scrollTo({
      top:document.body.offsetHeight,
      behavior:"smooth"
    })
  },[])
  const {id1,id2}  =useParams()
  const {userInfo,messages,user} = useContext(AuthContext)

  
  if (!messages || !Array.isArray(messages)) {
    return <div></div>;  // Render something informative
  }
  
  return <main className="">
    {messages.map((msg,idx)=>{
      
      return <div key={idx} className={` flex w-[90%]  mx-auto   py-1 pl-1  text-xl  pr-2 flex-col mb-[20px]`}>
        <div className={`message  ${msg.writer === id1?"sender":"receiver"}`}>
            <img src={msg.writer ==id1?user?.picture:userInfo.picture} alt="logo" className="w-7 rounded-full mr-3 absolute -left-3 -top-2 "/>
            <p className={`leading-loose`}>{msg.message}</p>
        </div>

    </div>
    })}
  </main>
}

export default BodyOfChat