import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import Router from 'next/router'

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3030/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    Router.push('/')
  } catch (err) {
    dispatch(loginFailure());
  }
};