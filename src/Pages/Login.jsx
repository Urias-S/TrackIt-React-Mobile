import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import logo from '../assets/images/Logo.svg'
import { Link } from "react-router";
export default function Login() {
  return (
    <>
      <GlobalStyle />
      <Logo>
        <img src={logo} />
      </Logo>
      <Form>
        <Email type="email" placeholder="email"></Email>
        <Senha type="password" placeholder="senha"></Senha>
        <Entrar>Entrar</Entrar>
      </Form>
      <Cadastro to="/cadastro">Não tem uma conta? Cadastre-se!</Cadastro>
    </>
  );
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
  background-color: rgba(82, 182, 255, 1);
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