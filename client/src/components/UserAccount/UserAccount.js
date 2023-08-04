import React, { useContext, useState, useEffect } from "react";
import ProtectedPage from "../ProtectedPage";
import {
  UserBalanceAmount,
  Container,
  UserCard,
  UserBalanceWrapper,
} from "./styles";
import AuthUserContext, { defaultUserJson } from "../Providers/AuthContext";
import ErrorsContext from "../Providers/ErrorsContext";
import MaterialFormInputGroup from "../common/MaterialFormInputGroup";
import MaterialSelectFormInputGroup from "../common/MaterialSelectFormInputGroup";
import UserAvatar from "./UserAvatar";
import { isEqual } from "lodash";
import MaterialSnackbarSubmit from "../common/MaterialSnackbarSubmit";
import SubmittingBackdrop from "../common/SubmittingBackdrop";
import { updateUser } from "../../services/user.services";

function UserAccount() {
  const { errors, setErrors } = useContext(ErrorsContext);
  const { user: currentUser, setUser: setCurrentUser } = useContext(
    AuthUserContext
  );
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(defaultUserJson);
  const [saveChangesSnackBarOpened, setSaveChangesSnackBarOpened] = useState(
    false
  );

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed && currentUser._id) {
      setUser(currentUser);
    }

    return () => (isSubscribed = false);
  }, [currentUser._id]);

  const checkDifference = (oldObj, newObj) => {
    let isNotDifferent = isEqual(oldObj, newObj);

    if (isNotDifferent) {
      setSaveChangesSnackBarOpened(false);
    } else {
      // Open up snackbar
      setSaveChangesSnackBarOpened(true);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    updateUser(user)
      .then((decoded) => {
        setTimeout(() => {
          setCurrentUser(decoded);
        setSubmitting(false);
        setSaveChangesSnackBarOpened(false);
        }, 500);
        
      })
      .catch((err) => {
        setSubmitting(false);

        setErrors(err.response.data);
      });
  };

  return (
    <>
      {submitting ? <SubmittingBackdrop /> : null}
      <Container>
        <UserCard>
          <UserAvatar
            userid={currentUser._id}
            currentPicture={currentUser.picture}
          />

          <UserBalanceWrapper>
            <b>Balance:</b>
            <UserBalanceAmount>{user.balance}</UserBalanceAmount>
          </UserBalanceWrapper>
          <div className="user-fields">
            <MaterialFormInputGroup
              name={"First name"}
              value={user.name.first}
              onKeyUp={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  name: { first: e.target.value, last: user.name.last },
                })
              }
              error={errors.first ? true : false}
              errorText={errors.first ? errors.first : ""}
            />
            <MaterialFormInputGroup
              name={"Last name"}
              value={user.name.last}
              onKeyUp={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  name: { last: e.target.value, first: user.name.first },
                })
              }
              error={errors.last ? true : false}
              errorText={errors.last ? errors.last : ""}
            />
            <MaterialFormInputGroup
              name={"Age"}
              value={user.age}
              type={"number"}
              onKeyUp={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  age: Number(e.target.value),
                })
              }
              error={errors.age ? true : false}
              errorText={errors.age ? errors.age : ""}
            />
            <MaterialSelectFormInputGroup
              name={"Eye Color"}
              value={user.eyeColor}
              options={[
                {
                  value: "blue",
                  label: "Blue",
                },
                {
                  value: "brown",
                  label: "Brown",
                },
                {
                  value: "green",
                  label: "Green",
                },
              ]}
              onOptionSelected={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  eyeColor: e.target.value,
                })
              }
              error={errors.age ? true : false}
              errorText={errors.age ? errors.age : ""}
            />
            <MaterialFormInputGroup
              name={"Company"}
              value={user.company}
              onKeyUp={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  company: e.target.value,
                })
              }
              error={errors.company ? true : false}
              errorText={errors.company ? errors.company : ""}
            />
            <MaterialFormInputGroup
              name={"Email"}
              value={user.email}
              onKeyUp={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              error={errors.email ? true : false}
              errorText={errors.email ? errors.email : ""}
            />
            <MaterialFormInputGroup
              name={"Phone"}
              value={user.phone}
              onKeyUp={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  phone: e.target.value,
                })
              }
              error={errors.phone ? true : false}
              errorText={errors.phone ? errors.phone : ""}
            />
            <MaterialFormInputGroup
              name={"Address"}
              value={user.address}
              onKeyUp={() => checkDifference(currentUser, user)}
              handleChange={(e) =>
                setUser({
                  ...user,
                  address: e.target.value,
                })
              }
              error={errors.address ? true : false}
              errorText={errors.address ? errors.address : ""}
            />
          </div>
        </UserCard>
      </Container>
      {!submitting && (
        <MaterialSnackbarSubmit
          message={"Would you want to save your changes?"}
          submitText={"Save"}
          submittingText={"Saving please wait..."}
          submitting={submitting}
          callback={() => handleSubmit()}
          setOpen={setSaveChangesSnackBarOpened}
          open={saveChangesSnackBarOpened}
        />
      )}
    </>
  );
}

export default (props) => (
  <ProtectedPage {...props}>
    <UserAccount {...props} />
  </ProtectedPage>
);
