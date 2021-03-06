import styles from "./index.module.scss";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context/Context";
import withAuth from '../../middleware/withAuth';
import withSubscribtion from '../../middleware/withSubscribtion';
import Footer from "../../components/footer/Footer";

function index() {
  const { user } = useContext(Context);
  const [list, setList] = useState({ content:user?.wichlist ? user.wichlist : [], title:"My list"});
  useEffect(() => {
   setList({content:user?.wichlist ? user.wichlist : [], title:"My list"})
  }, [user]);

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