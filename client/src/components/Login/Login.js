import React, { useState, useContext } from "react";
import BareLayout from "../Layout/BareLayout";
import Logo from "../Providers/logo";
import { Container, LoginSubmitButton } from "./styles";
import AuthUserContext from "../Providers/AuthContext";
import MaterialFormInputGroup from "../common/MaterialFormInputGroup";
import ErrorsContext from "../Providers/ErrorsContext";
import { loginUser } from "../../services/user.services";
import { ACCOUNT } from "../Layout/routes";
import SubmittingBackdrop from "../common/SubmittingBackdrop";

function Login(props) {
  const { history } = props;
  const { errors, setErrors } = useContext(ErrorsContext);
  const { setUser } = useContext(AuthUserContext);
  const [email, setEmail] = useState("henderson.briggs@geeknet.net");
  const [password, setPassword] = useState("23derd*334");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    setSubmitting(true);
    let payload = {
      email,
      password,
    };

    loginUser(payload)
      .then((decoded) => {
        setUser(decoded);
        setTimeout(() => {
          setSubmitting(false);

          history.push(`${ACCOUNT}?id=${decoded._id}`);
        }, 300);
      })
      .catch((err) => {
        // We are setting the errors
        // That comes from /api/users/login
        // which is a post method
        setErrors(err.response.data);
        setSubmitting(false);

        throw err;
      });
  };

  return (
    <>
      {submitting ? <SubmittingBackdrop /> : ""}
      <Container>
        <div className="login-wrapper">
          <div className="logo-wrapper">
            <Logo />
          </div>

          <div className="card">
            <div className="form-wrapper">
              <MaterialFormInputGroup
                disabled={submitting}
                value={email}
                variant={"outlined"}
                name={"Email"}
                handleChange={(e) => setEmail(e.target.value)}
                errorText={errors.email ? errors.email : ""}
                error={errors.email ? errors.email : false}
              />
              <MaterialFormInputGroup
                disabled={submitting}
                variant={"outlined"}
                value={password}
                name={"Password"}
                type={"password"}
                handleChange={(e) => setPassword(e.target.value)}
                errorText={errors.password ? errors.password : ""}
                error={errors.password ? errors.password : false}
              />

              <LoginSubmitButton
                disabled={submitting}
                onClick={() => onSubmit()}
              >
                {submitting ? "Logging in" : "Login"}
              </LoginSubmitButton>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const prop = (props) => (
  <BareLayout>
    <Login {...props} />
  </BareLayout>
);

export default prop;
