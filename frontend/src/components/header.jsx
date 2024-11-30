import {useContext} from 'react'
import  {AuthContext}from '../context'
import img from '../assets/USER.jpg'
const SERVER_URL = import.meta.env.VITE_SERVER_URL
const Header = ({handleLogout}) => {
    
    const {user} = useContext(AuthContext)
    const imgURL = `${SERVER_URL}/${user?.picture}`||img
    return (
    <section className="bg-gradient-to-r from-blue-300 to-green-600   w-full m-auto p-4 rounded-md flex items-center justify-between">
    <button>
    <img src={imgURL} alt={user?.name} className="rounded-full"/>
    </button>
    <div className="ml-10  flex-1 ">        

        <h4>Welcome,<span className="font-bold"> {user?.name}</span></h4>
        <p className="font-extrabold">Email: <span className="font-mono">{user?.email}</span></p>
    </div>
    <button className="bg-black text-white ml-4 p-3 rounded-full font-bold" onClick={handleLogout}>
    Logout
  </button>
</section>
  )
}

export default Header