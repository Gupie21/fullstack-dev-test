import styled from "styled-components";
import { device } from "../Layout/GlobalStyle";
import { Button } from "@mui/material";

export const Container = styled.div`
  background: #f9f9f9;
  height: 100vh;
  display: flex;
  justify-content: center;

  .logo-wrapper {
    height: 100px;
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    svg {
      margin: auto;
      height: inherit;
    }
  }
  .login-wrapper {
    margin-top: 100px;

    width: 420px;

    @media ${device.mobileL} {
      width: 300px;
    }
  }

  .card {
    padding: 20px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background: white;
  }

  .form-wrapper {
      padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }
`;

export const LoginSubmitButton = styled(Button)`
  height: 40px;
  width: 100%;
  border: 1px solid blue;
  background-color: ${(props) => props.theme.colors.primary} !important;
  color: white !important;
  :disabled{
      opacity: 0.8;
  }
`;
