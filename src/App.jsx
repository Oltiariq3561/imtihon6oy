import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import MainLayout from './components/MainLayout'
import BookDetails from './Pages/Details'

function App() { 
  return (
    <div>
      <Routes>
        <Route index element={<MainLayout> <Home></Home></MainLayout>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
    </div>
  )
}

export default App