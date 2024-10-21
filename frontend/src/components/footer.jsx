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
    
    scrollTo({
      top:document.body.offsetHeight,
      behavior:"smooth"
    })
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
    <footer className="flex items-center fixed bottom-0 w-[60%] bg-white rounded-3xl h-16 border-t border-gray-300 p-2 left-[50%] -translate-x-1/2 ">
  <input 
    type="text" 
    required
    placeholder="Type a message..."
    className="text-[16px] outline-none shadow-md shadow-slate-400  flex-grow h-10 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 transition "
    ref={msgRef}
  />
  <button type="submit" onClick={handleSubmit} className="ml-2">
    <FaPaperPlane className="text-2xl text-green-500 cursor-pointer hover:text-green-700 transition" />
  </button>
</footer>

  )
}

export default Footer