import styles from "./index.module.scss";
import Navbar from "../../../components/navbar/Navbar";
import List from "../../../components/list/List";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import withAuth from '../../../middleware/withAuth';
import withSubscribtion from '../../../middleware/withSubscribtion';
import Footer from "../../../components/footer/Footer";

function index() {
  const [list, setList] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const getWichlist = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/api/wichlists/${user.id}`
          // ,{
          //   headers: {
          //     token:JSON.parse(localStorage.getItem("user")).accessToken,
          //   },
          // }
        );
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getWichlist();
  }, [type, genre]);

  return (
    <div className={styles.home}>
      <Navbar />
      <List list={list} key={list._id}/>
      <Footer />
    </div>
  )
}

export default withAuth(withSubscribtion(index))