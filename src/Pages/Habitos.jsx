import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router";
export default function Habitos() {
  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>TrackIt</h1>
        <UserImg src='https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg' />
      </Header>
      <Content>
        <Title>
          <h1>Meus hábitos</h1>
          <AddHabito>+</AddHabito>
        </Title>
        <AdicionarHabito>
          <Nome>
            <input type="text" placeholder="nome do hábito" />
          </Nome>
          <Semana>
            {diasSemana.map((dia, index) => {
              return (
                <Checkbox key = {index}>
                <CheckboxInvisivel type = 'checkbox' id = {index}></CheckboxInvisivel>
                <CheckLabel htmlFor = {index}>{dia}</CheckLabel>
              </Checkbox>
              );
            })}
          </Semana>
          <Acoes>
            <Cancelar>Cancelar</Cancelar>
            <Salvar>Salvar</Salvar>
          </Acoes>
        </AdicionarHabito>
        <ListaHabitos>
          <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
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
const Cancelar = styled.button`
  color: rgba(82, 182, 255, 1);
  background-color: transparent;
  border: none;
  font-weight: 400;
  font-size: 16px;
`;
const Salvar = styled.button`
  background-color: rgba(82, 182, 255, 1);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 20px;
  font-weight: 400;
  font-size: 16px;
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
const AdicionarHabito = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  margin-top: 15px;
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
  height: calc(100vh -  145px);
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(18, 107, 165, 1);
  width: 100vw;
  height: 80px;
  padding: 10px 20px;
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
`
