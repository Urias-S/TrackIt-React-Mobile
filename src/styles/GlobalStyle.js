import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    * {
      box-sizing: border-box;
      font-family: "Lexend Deca", sans-serif;

    }
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(242, 242, 242, 1);
    }
  }
`;

export default GlobalStyle;