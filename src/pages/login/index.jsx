import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import withoutAuth from '../../middleware/withoutAuth'
import styles from "./login.module.scss";
import Link from "next/link";
import logo from "../../../public/logo.png";
import Router from 'next/router'
import { loginFailure, loginStart, loginSuccess } from "../../Context/Actions";
import axios from "axios";

function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Context);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${process.env.API_URL}/auth/login`
      , {email, password}
      );
      dispatch(loginSuccess(res.data));
      Router.push('/')
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <img
            className={styles.logo}
            src={logo.src}
            alt=""
          />
        </div>
      </div>
      <div className={styles.container}>
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.loginButton} onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix? <Link href="/register"><b>Sign up now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
export default withoutAuth(index);