import { useEffect, useRef, useState, useContext} from 'react'
import { FaPaperPlane} from 'react-icons/fa'
import axios from 'axios'
import { AuthContext } from '../context'

const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true
const Footer = () => {

  const {user,messages,setMessages,userInfo} = useContext(AuthContext)
  
  const senderId = user?._id;
  const msgRef = useRef(null)  
  
  useEffect(()=>{
        if(msgRef.current){
          msgRef.current.focus()
      }
    },[])

  async function handleSubmit(e) {
    e.preventDefault()
    let msgValue = msgRef.current?.value.trim()
    if(!msgValue){
      alert("message mustn't be empty")
    
    }else{
        const msgData={
          sender:senderId,
          receiver:userInfo?._id,
          content:msgValue
        }

          try {
            const {data} = await axios.post(`${serverUrl}/sendMsg`,{msgData})
            setMessages((prevMsgs)=>[...(prevMsgs || []),data])
            msgRef.current.value = ""
            
          
          } catch (error) {
          console.log(error.message);
          
        }

    
      }
    }
    

  return (
    <footer className="flex items-center fixed bottom-5 left-10 w-full ">
      <input 
        type="text" 
        required
        placeholder="Enter Your Message Here" 
        className="p-4 text-[18px] outline-none shadow-md shadow-slate-400 w-[80%]" 
        ref={msgRef}
        
      />
      <button type="submit" onClick={handleSubmit}>
        <FaPaperPlane  className="text-4xl ml-4 cursor-pointer hover:text-blue-700 transition"/>

      </button>
    </footer>
  )
}

export default Footer