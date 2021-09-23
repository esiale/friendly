import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: 243, 156, 18;
    --secondary: 253, 99, 3;
    --tertiary: 246, 184, 85;
    --background: 255, 250, 250;
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
