import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';
import axios from "axios";
import Router from 'next/router';

function index() {
  const [movies, setMovies] = useState(null);
  const [serie, setSerie] = useState(null);
  const [genres, setGenres] = useState(null);


  useEffect(() => {
    const getMovies = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/movies`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setMovies(res.data.filter((element)=> element.isSeries===true));
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


  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...serie, [e.target.name]: value });
  };


  const handleChange = (e) => {
    setSerie({ ...serie, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createSerie(serie);
    Router.push("/admin/movies/movies")
  };

  const createSerie = async (serie) => {
    try {
      const res = await axios.post(`${process.env.API_URL}/series`
      , serie
      , {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {
    }
  };

  return (
    <>
    <Topbar />
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.newProduct}>
        <h1 className={styles.addProductTitle}>New Serie</h1>
        <form className={styles.addProductForm}>
        <div className={styles.formLeft}>
              <div className={styles.addProductItem}>
                <label>Image</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  placeholder="Url of the image"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Title image</label>
                <input
                  type="text"
                  id="imgTitle"
                  name="imgTitle"
                  placeholder="Url of the title"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Thumbnail image</label>
                <input
                  type="text"
                  id="imgSm"
                  name="imgSm"
                  placeholder="Url of the small image"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Exemple : John Wick"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Year</label>
                <input
                  type="text"
                  placeholder="Year"
                  name="year"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="Duration"
                  name="duration"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Age Limit</label>
                <input
                  type="text"
                  placeholder="Age limit"
                  name="limit"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.addProductItem}>
                <label>Trailer</label>
                <input
                  type="text"
                  name="trailer"
                  placeholder="Url of the trailer"
                  onChange={handleChange}
                />
              </div>
          </div>
         
          <div className={styles.formRight}>
          <div className={styles.addProductItem}>
              <label>Genre (ctrl + click to select multiple)</label>
              <select
                multiple
                name="genre"
                onChange={handleSelect}
                style={{ height: "315px" }}
              >
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
          </div>
          <div className={styles.addProductItem}>
              <label>Episodes (ctrl + click to select multiple)</label>
              <select
                multiple
                name="movies"
                onChange={handleSelect}
                style={{ height: "315px" }}
              >
                {movies?.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className={styles.addProductButton} onClick={handleSubmit}>
            Upload
          </button>
        </form>
      </div>
    </div>
  </>
  );
}
export default withAuth(withAdmin(index))
