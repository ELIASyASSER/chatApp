import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import Callback from './callback'
import Home from './Home'
function App() {

  return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile' element={<Callback/>}/>
            </Routes>
          </Router>
  )
}
export default App