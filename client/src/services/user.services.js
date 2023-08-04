import axios, { getHeaders } from "./axios";
import jwt_decode from "jwt-decode";

const saveItem = (item, selectedValue) => {
  try {
    localStorage.setItem(item, selectedValue);
  } catch {
    console.error("could not save token in loginUser");
  }
};

export const updateUser = (body) => {
  return axios
    .post(`/api/users`, body, getHeaders())
    .then(({ data }) => {
      const { token } = data;
      saveItem("jwt", token);

      // Decode token to get user data
      const decoded = jwt_decode(token);
      saveItem("email", decoded.email);

      return decoded;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUserPictureByUserID = (userid) => {
  return axios
    .get(`/api/users/picture/${userid}`)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const updateUserPicture = (body) => {
  // it takes the following in req.body
  // {
  //   userid
  //   picture
  // }

  return axios
    .patch(`/api/users/picture`, body, getHeaders())
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const loginUser = (body) => {
  let { email, password } = body;
  return axios
    .post(`/api/users/login`, body)
    .then(({ data }) => {
      const { token } = data;
      saveItem("jwt", token);
      saveItem("email", email);
      saveItem("password", password);

      // Decode token to get user data
      const decoded = jwt_decode(token);
      return decoded;
    })
    .catch((err) => {
      throw err;
    });
};
