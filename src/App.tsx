import { isDarkAtom } from 'atoms';
import { useRecoilValue } from 'recoil';
import Router from 'Router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';
import { darkTheme, lightTheme } from 'Theme';

const modalBgStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: #00000080;
  overflow: hidden;
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <ModalProvider backgroundComponent={modalBgStyle}>
          <GlobalStyle />
          <Router />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    user-select: none;
    box-sizing: border-box;
    font-family: "Noto Sans KR",sans-serif;
    letter-spacing: 0.3px;
    font-family: 'Gothic A1', sans-serif;
    font-family: 'Nanum Gothic Coding', monospace;
    font-family: 'Noto Sans KR', sans-serif;

  }
  *::selection {
    background: rgba(35, 131, 226, 0.28);
}
  body {
    display: "flex"; 
    flex-direction: "column";
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    transition: 0.2s background-color, 0.2s color;
    overflow-y: hidden;
  }
  a {
    text-decoration:none;
    color: inherit;
  }
`;

export default App;
