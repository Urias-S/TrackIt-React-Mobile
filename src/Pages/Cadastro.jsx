import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import logo from '../assets/images/Logo.svg'
import { useState } from "react";
import axios from "axios";
import { Comment } from "react-loader-spinner";
export default function Cadastro() {

  const [carregando, setCarregando] = useState(false);

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Logo>
        <img src={logo} />
      </Logo>
      <Form onSubmit={register}>
        <Email
          type="email"
          placeholder="email"
          onChange={(e) => { setEmail(e.target.value) }}
          value={email}
          required
          disabled={carregando}>

        </Email>

        <Senha
          type="password"
          placeholder="senha"
          onChange={(e) => { setSenha(e.target.value) }}
          value={senha}
          required
          disabled={carregando}>
        </Senha>

        <Nome
          type="text"
          placeholder="nome"
          onChange={(e) => { setNome(e.target.value) }}
          value={nome}
          required
          disabled={carregando}>
        </Nome>

        <Foto
          type="text"
          placeholder="foto"
          onChange={(e) => { setFoto(e.target.value) }}
          value={foto}
          required
          disabled={carregando}>
        </Foto>

        <Entrar $carregando={carregando} type="submit" disabled={carregando}>{
          carregando ? <Comment backgroundColor="transparent" /> : 'Cadastrar'}</Entrar>
      </Form>
      <Login to="/">Já tem uma conta? Faça login!</Login>
    </>
  );
  function register(e) {
    e.preventDefault();
    setCarregando(true);

    const registro = {
      email,
      name: nome,
      image: foto,
      password: senha
    }
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', registro)

      .then(() => {
        setCarregando(false);
        navigate('/');
      })

      .catch((err) => {
        setCarregando(false);
        if (err.response) {
          const status = err.response.status;
          const data = err.response.data;

          if (status === 409 || data.message?.includes('E-mail')) {
            alert('Este e-mail já está cadastrado.');
          } else if (data.message?.toLowerCase().includes('senha')) {
            alert('A senha informada é inválida.');
          } else {
            alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
          }
        } else {
          alert('Erro de rede. Verifique sua conexão.');
        }
      });

  }
}

const Login = styled(Link)`
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

const Nome = styled.input`
  font-size: 20px;
  height: 48px;
  border-radius: 5px;
  border: solid 1px rgba(212, 212, 212, 1);
  padding-left: 8px;
  &::placeholder{
    color: rgba(219, 219, 219, 1);
  }
`;
const Foto = styled.input`
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