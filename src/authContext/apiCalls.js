import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import Router from 'next/router'

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${process.env.API_URL}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    Router.push('/')
  } catch (err) {
    dispatch(loginFailure());
  }
};