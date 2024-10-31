import { useEffect, useRef, useState, useContext} from 'react'
import { FaImage, FaPaperPlane} from 'react-icons/fa'
import {FiFileText} from 'react-icons/fi'
import axios from 'axios'
import { AuthContext } from '../context'
import { Form } from 'react-router-dom'

const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
const Footer = () => {

  const {user,messages,setMessages,userInfo} = useContext(AuthContext)
  const [file,setFile] = useState(null)
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
    let senderId = user?._id;
    let receiverId = userInfo?._id
    let content=msgValue
    let fileValue = file
    let img =fileValue

    if(!msgValue && !img){
      alert("message mustn't be empty")
    return;

    }else{

        const msgData = new FormData()
        msgData.set("sender",senderId)
        msgData.set("receiver",receiverId)
        msgData.set("content",content)

        if(img){
          msgData.set("img",img)
        }

        try {
            
            const {data} = await axios.post(`${serverUrl}/sendMsg`,msgData)
            setMessages((prevMsgs)=>[...(prevMsgs || []),data])
            msgRef.current.value = ""
            setFile(null)
            
          } catch (error) {
          console.log(error.message);
          
        }


      }
    
      
    }


  return (
    <footer className="flex items-center flex-wrap justify-center fixed bottom-2 min-h-fit md:w-[65%] w-[95%] bg-white  h-16 border-t border-gray-300 p-2  left-[50%] -translate-x-1/2 ">
  <input 
    type="text" 
    required
    placeholder="Type a message..."
    className="text-[16px] outline-none shadow-md shadow-slate-400  flex-grow h-10 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 transition "
    ref={msgRef}
  />
  <div className='flex flex-col items-center mx-3'>
    <input type="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])} className='bg-red-500 text-white hidden' id='fileInput'/>
    <label htmlFor="fileInput" className='cursor-pointer bg-blue-500 text-white  px-4 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none w-[52px] h-[52px] '>
      {file?<FiFileText className='size-full'/>:<FaImage className='size-full'/>}
    </label>
  </div>

  <button type="submit" onClick={handleSubmit} className="ml-2  p-2 mr-3 w-[52px] h-[52px] bg-green-500 rounded-md">
    <FaPaperPlane className="text-2xl text-white cursor-pointer hover:text-slate-300 transition size-full " />
  </button>
  
</footer>

  )
}

export default Footer