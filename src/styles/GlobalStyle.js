import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playball&display=swap');
  @media (max-width: 768px) {
    * {
      box-sizing: border-box;
      font-family: "Lexend Deca", sans-serif;

    }
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default GlobalStyle;