import React, { createContext, useState, useEffect } from 'react';

let ErrorsContext;
const { Provider, Consumer } = ErrorsContext = createContext();

const ErrorsProvider = ({ children }) => {
  const [errors, setErrors] = useState({})  
  const clearErrors = () => {
      setErrors({})
  }
  
  useEffect(() => {
    setErrors({})
  }, [children])

  return (
    <Provider value={{errors, setErrors, clearErrors}}>
      {children}
    </Provider>
  )
}

export { ErrorsProvider, Consumer as ErrorsConsumer, ErrorsContext }
export default ErrorsContext;

