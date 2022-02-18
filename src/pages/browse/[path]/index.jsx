import styles from "./index.module.scss";
import Navbar from "../../../components/navbar/Navbar";
import Featured from "../../../components/featured/Featured";
import List from "../../../components/list/List";
import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import withAuth from '../../../middleware/withAuth';
import withSubscribtion from '../../../middleware/withSubscribtion';
import Footer from "../../../components/footer/Footer";
import { Context } from "../../../Context/Context";

function index() {
  const { search } = useContext(Context);
  const [listsFiltred, setListsFiltred] = useState([]);
  const [moviesSearched, setMoviesSearched] = useState([]);


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
          ,{
            headers: {
              token:JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        console.log("lists=",res.data);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  const getMoviesFiltred = async () => {
    try {
      const res = await axios.get(`${process.env.API_URL}/movies`
        ,{
          headers: {
            token:JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setMoviesSearched(res.data.filter((element) => element.title.toLowerCase().includes(search.toLowerCase())));
      console.log("filtred",res.data.filter((element) => element.title.toLowerCase().includes(search.toLowerCase())));
    } catch (err) {
      console.log(err);
    }
  };

  // change this
  if(search){
    getMoviesFiltred();
    // for(let i = 0; i < moviesSearched.length; i+=10){
    //   setListsFiltred()

    // }
  }

  return (
    <div className={styles.home}>
      <Navbar />
      {!search ? 
        <>
          <Featured type={type} setGenre={setGenre} />
          {lists.map((list) => (
            <List list={list} key={list._id}/>
          ))}
        </>
        :
        <>
          {moviesSearched.map((movie)=>(
            <ListItem index={i} id={movie._id} key={i} />
          ))}
        </>
      } 
      <Footer />
    </div>
  )
}

export default withAuth(withSubscribtion(index))