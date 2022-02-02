import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import Router from 'next/router'
import styles from "./register.module.scss";
import logo from "../../../public/logo.png";
import Link from "next/link";
import withoutAuth from '../../middleware/withoutAuth'

function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("http://localhost:3030/api/auth/register"
      ,{ 
        email, 
        username, 
        password 
      });
      Router.push('/login')
    } catch (err) {}
  };
  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <img
            className={styles.logo}
            src={logo.src}
            alt=""
          />
          <Link href="/login">
            <button className={styles.login__button}>Sign In</button>
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className={styles.input}>
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className={styles.register__button} onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className={styles.input}>
            <input type="username" placeholder="Username" ref={usernameRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className={styles.register__button} onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default withoutAuth(index);