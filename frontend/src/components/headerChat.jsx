import { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../context'
import img from '../assets/USER.jpg'
import {FaArrowCircleLeft} from 'react-icons/fa'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const serverUrl = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true


const HeaderChat = ({back,lastActive}) => {
  let boolean = false;
  function formating(timestamp) {
    let now = new Date()
    let diff = now - new Date(timestamp)
    let diffInminutes = Math.floor(diff/(1000*60))
    let diffInhours = Math.floor(diffInminutes/60)
    if(diffInminutes <60){
      if(diffInminutes <1){
        return `Active Now `
      }
      else if(diffInminutes<=3){
        boolean = true;
        return `Active Before ${diffInminutes} Minute${diffInminutes ===1?'':'s'}`

      }else{
        boolean = false
        return `Active Before ${diffInminutes} Minute${diffInminutes ===1?'':'s'}`
      }
    }
    if(diffInhours <24){

      boolean = false
      return `Active Before ${diffInhours} hour${diffInhours ===1?'':'s'}`

    }
      const diffInDays = Math.floor(diffInhours / 24);
  return `Active Before ${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
    
  }




  const {id2} = useParams()
  const {userInfo,setUserInfo} = useContext(AuthContext)

  useEffect(() => {
    (async()=>{
      try {
        const {data} = await axios.get(`${serverUrl}/user/${id2}`)
        setUserInfo(data)

      } catch (error) {
        console.log(error.message);
      }
    })()
  

  },[id2])

  const name = userInfo?.name.toUpperCase()
  return (
    <header className="bg-white w-full sm:w-[95%] m-2 mx-auto p-3 flex items-center ">
      <button onClick={back}>
        <FaArrowCircleLeft className="w-10  h-10 cursor-pointer" />
      </button>
    <div className="flex ml-6">
      <div className="relative bg-black rounded-lg overflow-hidden sm:w-20 sm:h-20 w-16 h-16"> 
          <img src={ userInfo?.picture ||img } alt="profile " className="profileImg  w-full" />
          <span className={`absolute left-0 top-0 w-6 h-6 ${boolean?'bg-green-600 ':'bg-red-500'} rounded-full`}></span>
      </div>

        <div className="ml-9 ">
        <p className="sm:text-4xl text-2xl font-mono mb-4">{ name || "username"}</p>
            <span className="text-gray-400 mr-3 ">{formating(lastActive)}</span>
        </div>

    </div>
  </header>
  )
}

export default HeaderChat