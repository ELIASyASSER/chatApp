import { useContext } from "react"
import {AuthContext} from '../context'
import { Navigate, Outlet } from "react-router-dom"

const ProtectedChat = ()=>{
const {loggedIn} = useContext(AuthContext)
return loggedIn?<Outlet/>:<Navigate to='/'/>
}
export default ProtectedChat