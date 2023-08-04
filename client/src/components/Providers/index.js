import React from 'react'
import { AuthProvider } from "./AuthContext";
import { ErrorsProvider } from "./ErrorsContext";

const ContextProvider = (props) => (
  <ErrorsProvider>
    <AuthProvider {...props}>
        {props.children}
    </AuthProvider>
  </ErrorsProvider>
);

export default ContextProvider


