import { useContext, useEffect } from "react"
import {AuthContext} from '../context.jsx'
import axios from "axios"
import {useParams}from 'react-router-dom'

const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

const BodyOfChat = () => {

  const {id1,id2}  =useParams()
  const {userInfo,messages,user} = useContext(AuthContext)
  useEffect(()=>{
    scrollTo({
      top:document.body.offsetHeight,
      behavior:"smooth"
    })
  },[])

  
  if (!messages || !Array.isArray(messages)) {
    return <div></div>;  // Render something informative
  }
  
  return <main className="mb-40">
    {messages.map((msg,idx)=>{
      
      return <div key={idx} className={`flex w-[90%]  mx-auto  py-1 pl-1  text-xl  pr-2 flex-col`}>
        
        <div className={`message  ${msg.writer === id1?"sender":"receiver"}${!msg.message?' w-10 h-10 rounded-2xl':''}`}>
            <img src={msg.writer ==id1?user?.picture:userInfo.picture} alt="logo" className={`w-7 rounded-full mr-3 absolute   ${!msg.message?"left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full":"-left-3 -top-2"}`}/>
            <p className={`leading-loose ${msg.message?'px-4 py-2':'p-5'}`}>{msg.message}</p>
            
        </div>
            <img src={`${serverUrl}${msg.img}`}  className={`md:w-[360px] w-72  rounded-sm max-w-full ${msg.writer === id1?"sender":"receiver"} `}/>
        

    </div>
    })}
  </main>
}

export default BodyOfChat