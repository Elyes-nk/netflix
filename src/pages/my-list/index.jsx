import styles from "./index.module.scss";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import { useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import withAuth from '../../middleware/withAuth';
import withSubscribtion from '../../middleware/withSubscribtion';
import Footer from "../../components/footer/Footer";

function index() {
  const { user } = useContext(AuthContext);
  const list = {
    content:user?.wichlist ? user.wichlist : [],
    title:"Wichlist"
  };

  return (
    <div className={styles.home}>
      <Navbar />
      <div  className={styles.wichlist}>
        <List list={list}/>
      </div>
      <Footer />
    </div>
  )
}

export default withAuth(withSubscribtion(index))