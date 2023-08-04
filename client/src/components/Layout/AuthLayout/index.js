import React from "react";
import PropTypes from "prop-types";
import { AuthContainer, AuthContent } from "./styles";
import AuthHeader from "./AuthHeader";
import ContextProvider from "../../Providers";

const AuthLayout = (props) => {
  let {children, title} = props;
  return (
    <ContextProvider {...props}>
      <AuthContainer>
        <AuthHeader title={title} />
        <AuthContent>{children}</AuthContent>
      </AuthContainer>
    </ContextProvider>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default AuthLayout;
