import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import Callback from './callback'
import Home from './Home'
import Chat from './components/chat'
import Dashboard from './dashboard'
import ProtectedChat from './components/ProtectedChat'
import NotFoundPage from './components/notFoundPage'
function App() {

  return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile' element={<Callback/>}/>
                <Route element={<ProtectedChat/>}>
                  <Route path='/:id1/:id2' element={<Chat/>}/>
                  <Route path='/' element={<Dashboard/>}/>
                </Route>
                <Route path='*' element={<NotFoundPage/>} />
            </Routes>
          </Router>
  )
}
export default App