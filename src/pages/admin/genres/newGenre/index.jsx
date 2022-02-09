import { useState } from "react";
import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";

export default function index() {
  const [genre, setGenre] = useState(null);

  const handleChange = (e) => {
    setGenre({ ...genre, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createGenre(genre);
  };

  const createGenre = async (genre) => {
    try {
      const res = await axios.post(`${process.env.API_URL}/genres`
      , genre
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
        <h1 className={styles.addProductTitle}>New Genre</h1>
        <form className={styles.addProductForm}>

          
          <div className={styles.addProductItem}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
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
