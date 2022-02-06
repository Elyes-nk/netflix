import styles from "./index.module.scss";
import Navbar from "../../../components/navbar/Navbar";
import Featured from "../../../components/featured/Featured";
import List from "../../../components/list/List";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import withAuth from '../../../middleware/withAuth';
import withSubscribtion from '../../../middleware/withSubscribtion';
import Footer from "../../../components/footer/Footer";

function index() {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const router = useRouter();
  const type = router.query.path === "movies" ? 
                    "movies"
                    : 
                    (router.query.path === "series" ? 
                          "series"
                          :
                          null)
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
          // ,{
          //   headers: {
          //     token:JSON.parse(localStorage.getItem("user")).accessToken,
          //   },
          // }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className={styles.home}>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} key={list._id}/>
      ))}
      <Footer />
    </div>
  )
}

export default withAuth(withSubscribtion(index))