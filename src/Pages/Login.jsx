import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import logo from '../assets/images/Logo.svg'
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comment } from "react-loader-spinner";
export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const tokenLocal = localStorage.getItem('token');
    if (tokenLocal !== null) {
      navigate('/habitos');
    }
  }, [])
  return (
    <>
      <GlobalStyle />
      <Logo>
        <img src={logo} />
      </Logo>
      <Form onSubmit={signIn}>
        <Email
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={carregando}>
        </Email>
        <Senha
          type="password"
          placeholder="senha"
          onChange={(e) => setSenha(e.target.value)}
          required
          disabled={carregando}>
        </Senha>
        <Entrar type="submit" $carregando={carregando} disabled={carregando}>{carregando ? <Comment backgroundColor="transparent" /> : 'Entrar'}</Entrar>
      </Form>
      <Cadastro to="/cadastro">Não tem uma conta? Cadastre-se!</Cadastro>
    </>
  );
  function signIn(e) {
    e.preventDefault();
    setCarregando(true);
    const corpo = {
      email,
      password: senha
    }
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', corpo)
      .then((res) => {
        setCarregando(false);
        localStorage.setItem('userData', JSON.stringify(res.data));
        navigate('/hoje');
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.data?.message?.includes('senha')) {
          alert('Usuário e/ou senha inválidos!');
        } else if (err.response?.status === 422) {
          alert('Escreva o email no formato correto (exemplo@exemplo.com)');
        } else {
          alert('Erro ao tentar fazer login. Verifique sua conexão ou tente novamente mais tarde.');
        }
        setCarregando(false);
      });
  }
}

const Cadastro = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: "Lexend Deca", sans-serif;
  color: rgba(82, 182, 255, 1);
`

const Entrar = styled.button`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  color: white;
  font-size: 20px;
  font-weight: 400;
  background-color: ${props => props.$carregando ? 'rgba(82, 182, 255, 0.7)' : 'rgba(82, 182, 255, 1)'};
  border-radius: 5px;
  border: none;
`;
const Email = styled.input`
  height: 48px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 1px rgba(212, 212, 212, 1);
  padding-left: 8px;

  &::placeholder{
    color: rgba(219, 219, 219, 1);
  }
`;
const Senha = styled.input`
  font-size: 20px;
  height: 48px;
  border-radius: 5px;
  border: solid 1px rgba(212, 212, 212, 1);
  padding-left: 8px;
  &::placeholder{
    color: rgba(219, 219, 219, 1);
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;
  gap: 8px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  
`;