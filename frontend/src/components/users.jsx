import { Link } from 'react-router-dom'
import img from '../assets/USER.jpg'
import { useContext } from 'react'
import { AuthContext } from '../context'
const SERVER_URL = import.meta.env.VITE_SERVER_URL
const User = (props) => {
  // Fetch old messages when entering the chat
  const {user,messages,setMessages} = useContext(AuthContext)
    let now = new Date(props.person.createdAt)
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let formattedDate = now.getDate()  + "-" + months[now.getMonth()] + "-" + now.getFullYear()
    const date = formattedDate

    return (
        <Link to={`${user._id}/${props.person._id}`} className="flex justify-between shadow-2xl items-center p-5 mb-1 bg-[#f0e9ec] cursor-pointer hover:bg-[#d6d0d0] transition-[0.4s]">
            <div className="flex items-center ">
                <img src={`${SERVER_URL}/${props.person.picture}` || img} className="rounded-full w-[80px]  border-black border-2" alt={props.person.name} />
                <div className="ml-4  flex-1">
                  <p className=" font-bold text-[18px]">{(props.person.name).toUpperCase()}</p>
                </div>
            </div>
            
            <time className="font-medium">
            <span className="text-gray-500 mr-3 font-mono ">Joined At</span>

              {
                date
              }
            </time>
  
          </Link>          
  )
}

export default User