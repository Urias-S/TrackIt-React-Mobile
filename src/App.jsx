import Login from './Pages/Login.jsx'
import Cadastro from './Pages/Cadastro.jsx'
import Habitos from './Pages/Habitos.jsx'
import Hoje from './Pages/Hoje.jsx'
import { Route, Routes, useNavigate } from 'react-router'
import UserContext from './contexts/UserContext.js'
import { useEffect } from 'react'

function App() {
  const localToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localToken) {
      navigate('/');
    } 
  }, [])

  return (
      <UserContext.Provider value={localToken}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />

        <Route path='/habitos' element={<Habitos />} />
        <Route path='/hoje' element={<Hoje />} />
      </Routes>
      </UserContext.Provider>
  )
}

export default App
