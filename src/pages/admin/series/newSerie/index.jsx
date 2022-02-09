import { useState } from "react";
import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";

export default function index() {
  const [serie, setSerie] = useState(null);
  

  const handleChange = (e) => {
    setSerie({ ...serie, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createSerie(serie);
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
        <h1 className={styles.addProductTitle}>New Serie(</h1>
        <form className={styles.addProductForm}>
          <div className={styles.addProductItem}>
            <label>Image</label>
            <input
              type="text"
              id="img"
              name="img"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Title image</label>
            <input
              type="text"
              id="imgTitle"
              name="imgTitle"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Thumbnail image</label>
            <input
              type="text"
              id="imgSm"
              name="imgSm"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Title</label>
            <input
              type="text"
              placeholder="John Wick"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Description</label>
            <input
              type="text"
              placeholder="description"
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



          {/* choice of genres*/}
          <div className={styles.addProductItem}>
            <label>Genre</label>
            <input
              type="text"
              placeholder="Genre"
              name="genre"
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
            <label>Limit</label>
            <input
              type="text"
              placeholder="limit"
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
              onChange={handleChange}
            />
          </div>





          {/* choice of movies*/}
          <div className={styles.addProductItem}>
            <label>Video</label>
            <input
              type="text"
              name="video"
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
