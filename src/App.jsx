import Login from './Pages/Login.jsx'
import Cadastro from './Pages/Cadastro.jsx'
import Habitos from './Pages/Habitos.jsx'
import Hoje from './Pages/Hoje.jsx'
import { Route, Routes, useNavigate } from 'react-router'
import UserContext from './contexts/UserContext.js'
import { useEffect } from 'react'

function App() {
  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.token) {
      navigate('/');
    } 
  }, [])

  return (
      <UserContext.Provider value={user}>
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
