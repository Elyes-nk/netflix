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

  //GET LIST AND FILTER IT WITH TYPE AND GENRE
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/lists${type ? "?type=" + type : ""}`
          ,{
            headers: {
              token:JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(genre ? res.data.filter((el) => el.genre.includes(genre)) : res.data);
      } catch (err) {
      }
    };
    getRandomLists();
  }, [type, genre]);

 
  //SEARCH MOVIES SERIES AND CREAT LISTS OF IT
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
    } catch (err) {
    }
  };

  useEffect(() => {
    if(search){
      getMoviesFiltred();
      let list = [];
      for(let i = 0; i < moviesSearched.length; i+=10){
        let content = [];
        for(let j = i; j < moviesSearched.length; j++){
          content.push(moviesSearched[j]._id)
        }
        list.push({content})
      }
      setListsFiltred(list)
    }
  }, [search]);

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
        <div className={styles.search__container}>
          {listsFiltred.map((list, i)=>(
            <List list={list} key={i}/>
          ))}
        </div>
      } 
      <Footer />
    </div>
  )
}

export default withAuth(withSubscribtion(index))