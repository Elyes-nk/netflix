import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';
import axios from 'axios';
import Router from 'next/router';

function index() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [list, setList] = useState(null);


  useEffect(() => {
    const getMovies = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/movies`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setMovies(res.data);
        } catch (err) {
        }
    }
    getMovies()
  }, []);

  useEffect(() => {
    const getGenres = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/genres`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setGenres(res.data);
        } catch (err) {
        }
    }
    getGenres()
  }, []);


  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list);
    Router.push("/admin/lists/lists")
  };

  const createList = async (list) => {
    try {
      const res = await axios.post(`${process.env.API_URL}/lists`
      , list
      , {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      console.log(res.data);
    } catch (err) {
    }
  };


  return (
    <>
    <Topbar />
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.newProduct}>
        <h1 className={styles.addProductTitle}>New List</h1>
        <form className={styles.addProductForm}>
          <div className={styles.formLeft}>
            <div className={styles.addProductItem}>
              <label>Title</label>
              <input
                type="text"
                placeholder="Exemple : Populare Movies"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className={styles.addProductItem}>
              <label>Genre (ctrl + click to select multiple)</label>
              <select
                multiple
                name="genre"
                onChange={handleSelect}
                style={{ height: "200px" }}
              >
                {genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formRight}>
            <div className={styles.addProductItem}>
              <label>Content (ctrl + click to select multiple)</label>
              <select
                multiple
                name="content"
                onChange={handleSelect}
                style={{ height: "280px" }}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className={styles.addProductButton} onClick={handleSubmit}>
            Create
          </button>
        </form>
      </div>
    </div>
  </>
  );
}
export default withAuth(withAdmin(index))
