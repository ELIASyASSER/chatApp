import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import Callback from './callback'
import Home from './Home'
import Chat from './chat'
function App() {

  return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile' element={<Callback/>}/>
                <Route path='/chat' element={<Chat/>}/>
            </Routes>
          </Router>
  )
}
export default App