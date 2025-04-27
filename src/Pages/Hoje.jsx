import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import { FaRegCalendarAlt, FaRegCalendarCheck, FaCheck } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function Hoje() {
  const user = useContext(UserContext);
  const [habitosHoje, setHabitosHoje] = useState([]);
  const navigate = useNavigate();
  if (!user) return;
  useEffect(() => {buscaHabitos()}, []);
  useEffect(() => {
    if (!localStorage.getItem('userData') || JSON.parse(localStorage.getItem('userData')).token !== user.token) {
      navigate('/');
      return;
    }
  }, []);
  function buscaHabitos() {
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
      .then((res) => {
        setHabitosHoje(res.data);
      })
      .catch(err => alert('Ocorreu um erro, tente novamente mais tarde'));
  }
  function defineDataHoje() {
    const hoje = new Date();
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const diaDaSemana = diasDaSemana[hoje.getDay()];
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');

    const dataFormatada = `${diaDaSemana}, ${dia}/${mes}`
    return dataFormatada;
  }
  function fazHabito(habitoId) {
    if (!localStorage.getItem('userData') || JSON.parse(localStorage.getItem('userData')).token !== user.token) {
      navigate('/');
      return;
    }
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitoId}/check`, {}, config)
    .then(() => {
      buscaHabitos();
    })
    .catch(() => alert('Ocorreu um erro, tente novamente mais tarde'));
  }
  function desfazHabito (habitoId){
    if (!localStorage.getItem('userData') || JSON.parse(localStorage.getItem('userData')).token !== user.token) {
      navigate('/');
      return;
    }
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitoId}/uncheck`, {}, config)
    .then(() => {
      buscaHabitos();
    })
    .catch(() => alert('Ocorreu um erro, tente novamente mais tarde'));
  }
  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>TrackIt</h1>
        <UserImg src={user.image} />
      </Header>
      <Content>
        <Title>
          {defineDataHoje()}
        </Title>
        <Habitos>
          {habitosHoje.map((habito, index) => {
            return (
              <Habito key={index}>
                <Esquerda>
                  <h1>{habito.name}</h1>
                  <p>{`Sequência atual: ${habito.currentSequence} dias`}</p>
                  <p>{`Seu recorde: ${habito.highestSequence} dias`}</p>
                </Esquerda>
                <Direita $feito={habito.done} onClick={habito.done ? () => desfazHabito(habito.id)  : () => fazHabito(habito.id)}>
                  <CheckContainer>
                    <FaCheck />
                  </CheckContainer>
                </Direita>
              </Habito>
            );
          })}
        </Habitos>
      </Content>
      <Bottom>
        <Lista to={!localStorage.getItem('userData') || JSON.parse(localStorage.getItem('userData')).token !== user.token ? '/' : '/habitos'}>
          <FaRegCalendarAlt />
          <p>Hábitos</p>
        </Lista>
        <Dia to={!localStorage.getItem('userData') || JSON.parse(localStorage.getItem('userData')).token !== user.token ? '/' : '/hoje'}>
          <FaRegCalendarCheck />
          <p>Hoje</p>
        </Dia>
      </Bottom>
    </>
  );
}
const Esquerda = styled.div`
  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 10px;
  }
  p {
    font-family: "Lexend Deca", sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 5px;
  }
`;
const Direita = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${props => props.$feito ? "rgba(143, 197, 73, 1)" : "rgba(235, 235, 235, 1)"};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: white;
`;

const Habito = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 5px;
  padding: 13px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

`;
const Habitos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Title = styled.div`
    font-family: "Lexend Deca", sans-serif;
    color: rgba(18, 107, 165, 1);
    font-weight: 400;
    font-size: 25px;
`;
const Dia = styled(Link)`
  width: 50%;
  height: 100%;
  border: none;
  background-color: rgba(82, 182, 255, 1);
  color: white;
  font-size: 18px;
  display: flex;
  font-family: "Lexend Deca", sans-serif;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const Lista = styled(Link)`
  width: 50%;
  height: 100%;
  border: none;
  color: rgba(212, 212, 212, 1);
  background-color: white;
  font-size: 18px;
  font-family: "Lexend Deca", sans-serif;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 65px;
  display: flex;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 15px 25px 15px;
  background-color: rgba(242, 242, 242, 1);
  height: 100%;
  width: 100vw;
  margin-top: 90px;
  margin-bottom: 40px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(18, 107, 165, 1);
  width: 100vw;
  height: 80px;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  h1 {
    font-family: "Playball", cursive;
    font-weight: 400;
    color: white;
    font-size: 45px;
  }
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
`
const UserImg = styled.img`
  height: 55px;
  width: 55px;
  border-radius: 100%;
  object-fit: cover;
`