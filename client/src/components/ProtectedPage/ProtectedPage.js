import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { getJWT } from "../../services/axios/config";
import { LOGIN } from "../Layout/routes";
import { useNavigate } from "react-router-dom";

function ProtectedPage(props) {
  let history = useNavigate();

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      handleAuth();
    }

    return () => (isSubscribed = false);
  }, []);

  const handleAuth = async () => {
    let token = await getJWT();

    if (token) {
      const decoded = jwt_decode(token);
      if (decoded && decoded._id) {

      }
    } else {
      history.push(`${LOGIN}`);
    }
  };

  return <>{props.children}</>;
}

export default ProtectedPage;
