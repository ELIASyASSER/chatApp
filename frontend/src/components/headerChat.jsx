import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import img from '../assets/USER.jpg';
import { FaArrowCircleLeft } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const serverUrl = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

const HeaderChat = ({ back, lastActive }) => {

  // Use state for the online status
  const [isOnline, setIsOnline] = useState(false);
  const [msgStatus,setMsgStatus] = useState("")

  function formating(timestamp) {
    let now = new Date();
    let diff = now - new Date(timestamp);
    let diffInMinutes = Math.floor(diff / (1000 * 60));
    let diffInHours = Math.floor(diffInMinutes / 60);


    if (diffInMinutes < 60) {
      if (diffInMinutes <= 3) {
        setIsOnline(true);
        return `Active Now`;
      } 
      else {
        setIsOnline(false);
        return `Active Before ${diffInMinutes} Minute${diffInMinutes === 1 ? '' : 's'}`;
      }
    }

    if (diffInHours < 24) {
      setIsOnline(false);
      return `Active Before ${diffInHours} hour${diffInHours === 1 ? '' : 's'}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    setIsOnline(false);
    return `Active Before ${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
  }

useEffect(()=>{
  const lastTime = formating(lastActive)
  setMsgStatus(lastTime)

},[lastActive])



  const { id2 } = useParams();
  const { userInfo, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/user/${id2}`);
        setUserInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id2]);

  const name = userInfo?.name?.toUpperCase();
  const imgURL = `${serverUrl}/${userInfo?.picture}` || img
  
  return (
    <header className="bg-white w-full sm:w-full m-2 mx-auto p-3 flex items-center sticky top-0 z-20 ">
      <button onClick={back}>
        <FaArrowCircleLeft className="w-10 h-10 cursor-pointer" />
      </button>
      <div className="flex ml-6">
        <div className="relative bg-black rounded-lg overflow-hidden sm:w-20 sm:h-20 w-16 h-16"> 
          <img src={ imgURL} alt="profile" className="profileImg w-full" />
          <span className={`absolute left-0 top-0 w-6 h-6 ${isOnline ? 'bg-green-600' : 'bg-red-500'} rounded-full`}></span>
        </div>
        <div className="ml-9">
          <p className="sm:text-4xl text-2xl font-mono mb-4">{name || 'username'}</p>
          <span className="text-gray-400 mr-3">{msgStatus}</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderChat;
