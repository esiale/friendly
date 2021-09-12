import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
  :root {
    --accent: 243, 156, 18;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
