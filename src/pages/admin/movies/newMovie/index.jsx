import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';
import axios from "axios";
import Router from 'next/router';

function index() {
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const getGenres = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/genres`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          console.log(res.data);
          setGenres(res.data);
        } catch (err) {
          console.log(err);
        }
    }
    getGenres()
  }, []);

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie);
    Router.push("/admin/movies/movies")
  };

  const createMovie = async (movie) => {
    try {
      const res = await axios.post(`${process.env.API_URL}/movies`
      , movie
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
        <h1 className={styles.addProductTitle}>New Movie</h1>
        <form className={styles.addProductForm}>
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
              <label>Genre (ctrl + click to select multiple)</label>
              <select
                multiple
                name="genre"
                onChange={handleSelect}
                style={{ height: "200px" }}
              >
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
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
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
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
          <div className={styles.addProductItem}>
            <label>Video</label>
            <input
              type="text"
              name="video"
              placeholder="Url of the video"
              onChange={handleChange}
            />
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
