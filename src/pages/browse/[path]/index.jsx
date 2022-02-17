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
  var listFiltred = [];

  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [moviesSearched, setMoviesSearched] = useState([]);
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
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  const getMovies = async () => {
    try {
      const res = await axios.get(`${process.env.API_URL}/movies`
        ,{
          headers: {
            token:JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setMoviesSearched(res.data.filter((element) => element.title.includes(search)));
    } catch (err) {
      console.log(err);
    }
  };

  // change this
  if(search){
    getMovies();
    for(let i = 0; i < moviesFiltred.length; i+=5){
      let list = []
      for(let j = i; j < i+5; j++){
        list.push(moviesSearched[j])
      }
      listFiltred.push(list)
    }
  }
  console.log(lists);

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
          {/* change this */}
        </>
      } 
      <Footer />
    </div>
  )
}

export default withAuth(withSubscribtion(index))