import { createGlobalStyle } from "styled-components";
import orangeAvatar from '../../assets/images/avatars/orange-avatar.svg'
import purpleAvatar from '../../assets/images/avatars/purple-avatar.svg'
import blueAvatar from '../../assets/images/avatars/blue-avatar.svg'


// Media Query Breakpoints
export const BreakpointSmallMobile = 420;
export const BreakpointMobile = 575;
export const BreakpointTablet = 768;
export const BreakpointLargeDevices = 922;
export const BreakpointDesktop = 1200;

// Padding Page Variables
export const PaddingLeftRightDesktop = "3%";
export const PaddingLeftRightMobile = "2%";
export const MaxWidthPageDesktopOne = 1200;

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

export const theme = {
  colors: {
    primary: "#2C95F1",
  },
  avatars: [
    blueAvatar,
    orangeAvatar,
    purpleAvatar
  ]
};

export const GlobalStyle = createGlobalStyle`
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-y: none;
    html {
    box-sizing: border-box;
    font-size: 1rem;

    }
    *, *:before, *:after {
    box-sizing: inherit;
    }
    body {
    min-height: 100vh;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    line-height: 2;
    font-family: arial,sans-serif;
    background: white;
    }
`;


