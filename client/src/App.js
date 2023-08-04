import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import Login from "./components/Login";
import UserAccount from "./components/UserAccount";
import { theme, GlobalStyle } from "./components/Layout/GlobalStyle";
import './styles/_app.scss';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" component={Login}/>
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/account"
              render={(props) => (
                <AuthLayout title={"Account"} {...props}>
                  <UserAccount {...props} />
                </AuthLayout>
              )}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
