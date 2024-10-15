import img from '../assets/USER.jpg'
import {FaArrowCircleLeft} from 'react-icons/fa'
const HeaderChat = ({back,userInfo}) => {
  const name = userInfo?.name.toUpperCase()
  return (
    <header className="bg-white w-full sm:w-[95%] m-2 mx-auto p-3 flex items-center ">
    <FaArrowCircleLeft className="w-10  h-10 cursor-pointer" onClick={back}/>
    <div className="flex ml-6">
      <div className="relative bg-black rounded-lg overflow-hidden sm:w-20 sm:h-20 w-16 h-16"> 
          <img src={ userInfo?.picture ||img } alt="profile " className="profileImg  w-full" />
          <span className="online absolute left-0 top-0 w-6 h-6 bg-green-600 rounded-full"></span>
      </div>

        <div className="ml-9 ">
        <p className="sm:text-4xl text-2xl font-mono mb-4">{ name || "username"}</p>
            <span className="text-gray-400 mr-3 ">Joined At</span>
            <time className="font-semibold">{new Date(userInfo?.createdAt).toLocaleDateString()}</time>
        </div>
    
    </div>
  </header>
  )
}

export default HeaderChat