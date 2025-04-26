import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { Comment } from "react-loader-spinner";

export default function Habitos() {
  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const [habitos, setHabitos] = useState([]);
  const [addHabito, setAddHabito] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [nomeHabitoNovo, setNomeHabitoNovo] = useState('');
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  if (!user) return;
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);
  function buscarHabitos() {
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then((res) => {
        setHabitos(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

  }
  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then((res) => {
        setHabitos(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

  }, []);
  function enviarHabitoNovo(e) {
    e.preventDefault();
    setCarregando(true);

    const corpo = {
      name: nomeHabitoNovo,
      days: diasSelecionados
    }
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", corpo, config)
      .then(() => {
        setCarregando(false);
        setNomeHabitoNovo('');
        setDiasSelecionados([]);
        setAddHabito(false);
        buscarHabitos();
      })
      .catch((err) => {
        setCarregando(false);
        if (err.response.status === 422) {
          alert('Campo "nome do hábito" deve ser preenchido');
        } else {
          alert('Ocorreu um erro, tente novamente mais tarde');
        }
      });

  }
  function toggleDia(index) {
    if (diasSelecionados.includes(index)) {
      setDiasSelecionados(diasSelecionados.filter(dia => dia !== index))
    } else {
      setDiasSelecionados([...diasSelecionados, index])
    }
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
          <h1>Meus hábitos</h1>
          <AddHabito onClick={() => setAddHabito(true)}>+</AddHabito>
        </Title>
        {addHabito ? <><AdicionarHabito onSubmit={enviarHabitoNovo}>
          <Nome>
            <input
              value={nomeHabitoNovo}
              type="text"
              placeholder="nome do hábito"
              onChange={(e) => setNomeHabitoNovo(e.target.value)}
              disabled={carregando} />
          </Nome>
          <Semana>
            {diasSemana.map((dia, index) => {
              return (
                <Checkbox key={index}>
                  <CheckboxInvisivel type='checkbox' disabled={carregando} id={index} onChange={() => toggleDia(index)} checked={diasSelecionados.includes(index)}></CheckboxInvisivel>
                  <CheckLabel htmlFor={index}>{dia}</CheckLabel>
                </Checkbox>
              );
            })}
          </Semana>
          <Acoes>
            <Cancelar onClick={() => setAddHabito(false)} disabled={carregando}>Cancelar</Cancelar>
            <Salvar type="submit" disabled={carregando} $carregando={carregando}>{carregando ? <Comment backgroundColor="transparent" height="60px" width="60px" /> : 'Salvar'}</Salvar>
          </Acoes>
        </AdicionarHabito></> : <></>}
        <ListaHabitos>
          {habitos && habitos.length > 0 ? habitos.map((habito, index) => {
            const diasHabito = habito.days
            return (
              <div key={index}>
                <NomeHabito>{habito.name}</NomeHabito>
                <DiasHabito>{diasSemana.map((dia, index) => {
                  for (let i = 0; i < diasHabito.length; i++) {
                    if (index === diasHabito[i]) {
                      return (
                        <DiaSemana $selecionado={true} key={index}>{dia}</DiaSemana>
                      );
                    }
                  }
                  return <DiaSemana $selecionado={false} key={index}>{dia}</DiaSemana>
                })}</DiasHabito>
              </div>
            );
          }) : <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}
        </ListaHabitos>
      </Content>
      <Bottom>
        <Lista>
          <FaRegCalendarAlt />
          <p>Hábitos</p>
        </Lista>
        <Dia to={'/hoje'}>
          <FaRegCalendarCheck />
          <p>Hoje</p>
        </Dia>
      </Bottom>
    </>
  );
}

const NomeHabito = styled.h1`
  font-family: 'Lexend Deca', sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: rgba(102, 102, 102, 1);
`;
const DiaSemana = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lexend Deca', sans-serif;
  font-size: 20px;
  border: 1px solid rgba(212, 212, 212, 1);
  color: ${props => props.$selecionado ? "white" : "rgba(212, 212, 212, 1)"};
  background-color: ${props => props.$selecionado ? "rgba(212, 212, 212, 1)" : "transparent"};
  margin-bottom: 30px;
`;
const DiasHabito = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;
const Cancelar = styled.button`
  color: rgba(82, 182, 255, 1);
  background-color: transparent;
  border: none;
  font-weight: 400;
  font-size: 16px;
`;
const Salvar = styled.button`
  background-color: ${props => props.$carregando ? "rgba(82, 182, 255, 0.7)" : " rgba(82, 182, 255, 1)"};
  color: white;
  border: none;
  border-radius: 5px;
  width: 90px;
  height: 36px;
  padding: 8px 20px;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Acoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;
const Checkbox = styled.div`
  display: inline-block;
`;
const CheckboxInvisivel = styled.input`
  display: none;
  &:checked + label {
    background-color: rgba(212, 212, 212, 1);
    color: white;
  }
`;
const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(212, 212, 212, 1);
  border-radius: 5px;
  font-size: 20px;
  color: rgba(212, 212, 212, 1);
  font-family: 'Lexend Deca', sans-serif;

`;
const Semana = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  margin-top: 10px;
  input {
    width: 30px;
    height: 30px;
  }
`;
const Nome = styled.div`
  width: 100%;
  input {
    border: solid 1px rgba(212, 212, 212, 1);
    border-radius: 5px;
    width: 100%;
    height: 45px;
    font-size: 20px;
    padding-left: 10px;
    &::placeholder {
      color: rgba(212, 212, 212, 1);
    }
  }
`;
const AdicionarHabito = styled.form`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`;
const Lista = styled.button`
  width: 50%;
  height: 100%;
  border: none;
  background-color: rgba(82, 182, 255, 1);
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const Dia = styled(Link)`
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
const ListaHabitos = styled.div`
  p {
    color: rgba(102, 102, 102, 1);
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    margin-top: 30px;
  }
  div {
    margin-bottom: 30px;
  }
`;
const AddHabito = styled.button`
  background-color: rgba(82, 182, 255, 1);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 35px;
  border-radius: 5px;
  color: white;
  font-size: 25px;
  font-family: "Lexend Deca", sans-serif;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  h1 {
    font-family: "Lexend Deca", sans-serif;
    color: rgba(18, 107, 165, 1);
    font-weight: 400;
    font-size: 25px;
  }
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
