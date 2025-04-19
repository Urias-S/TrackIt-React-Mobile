import Login from './Pages/Login.jsx'
import Cadastro from './Pages/Cadastro.jsx'
import Habitos from './Pages/Habitos.jsx'
import Hoje from './Pages/Hoje.jsx'
import { Route, Routes } from 'react-router'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/cadastro' element={<Cadastro />}/>
      <Route path='/habitos' element={<Habitos />}/>
      <Route path='/hoje' element = {<Hoje />}/>
    </Routes>
  )
}

export default App
