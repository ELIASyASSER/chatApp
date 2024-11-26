import axios from "axios"
const serverUrl = import.meta.env.VITE_SERVER_URL
import {FaCoffee, FaFacebookMessenger, FaGoogle, FaMugHot} from 'react-icons/fa'

const Login = () => {

    const handleLogin = async () => {
      try {
        // Gets authentication url from backend server
        const {
          data: { url },
        } = await axios.get(`${serverUrl}/auth/url`)
        // Navigate to consent screen
        window.location.assign(url)
      } catch (err) {
        console.error(err)
      }
    }
    
    return (
    <div className=" w-[100%] xl:w-[87%] h-screen bg-white  p-0 m-auto shadow-lg   ">
        <div className="info h-[70%] bg-gradient-to-b  from-violet-500 to-red-400   flex flex-col  justify-center items-center">
            <div className="text-white  flex flex-col justify-center items-center leading-loose basis-3/4" >
              <FaFacebookMessenger className="text-5xl"/>
              <h1 className="font-bold text-2xl tracking-wide mb-8">Digital Chat </h1>
              <p className="text-3xl max-sm:text-center font-mono text-transparent  text-stroke bg-clip-text bg-gradient-to-r from-white to-[#08abec] animate-fill w-[88%]">Share Your Ideas In This World And Meet New People</p>
            </div>

            <div className="text-white flex items-center flex-col">
              <FaMugHot className="text-white text-6xl mb-8"/>
              <span className="font-mono text-3xl text-white  tracking-widest">Enjoy ..!</span>
            </div>
        </div>
        <div className="sign-up  h-[30%]  text-[2rem]  text-white bg-gradient-to-b from-red-400 to-blue-300 flex justify-between items-center flex-col">
          <button className="block w-2/3 sm:w-1/3 m-auto text-center  bg-black p-2 text-[20px] rounded-full" onClick={handleLogin}>
            <h3 className="inline-block">Sign With Google</h3>
            <FaGoogle className="inline-block ml-5 "/>
          </button>
        </div>
      
      
      </div>
    )
  }

  export default Login