import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import { Link } from "react-router";
export default function Habitos() {
  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>TrackIt</h1>
        <UserImg src = 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg'/>
      </Header>
    </>
  );
}
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(18, 107, 165, 1);
  width: 100vw;
  padding: 10px 20px;
  h1 {
    font-family: "Playball", cursive;
    font-weight: 400;
    color: white;
    font-size: 45px;
  }
`
const UserImg = styled.img`
  height: 55px;
  width: 55px;
  border-radius: 100%;
`
  