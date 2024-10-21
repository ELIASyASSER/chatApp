import { useContext } from "react"
import {AuthContext} from '../context'
import { Navigate, Outlet } from "react-router-dom"




const ProtectedChat = ()=>{

const {loggedIn} = useContext(AuthContext)
if (loggedIn ===  null){
    return <div>Authentication</div>
}

return loggedIn ==false?<Navigate to='/'/>:<Outlet/>


}


export default ProtectedChat