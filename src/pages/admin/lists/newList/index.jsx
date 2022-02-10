import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';

function index() {
  const [movies, setMovies] = useState([]);
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
    Router.push("/lists")
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
                placeholder="Popular Movies"
                name="title"
                onChange={handleChange}
              />
            </div>




            {/* lists of genres */}
            <div className={styles.addProductItem}>
              <label>Genre</label>
              <input
                type="text"
                placeholder="action"
                name="genre"
                onChange={handleChange}
              />
            </div>





            {/* delete? */}
            <div className={styles.addProductItem}>
              <label>Type</label>
              <select name="type" onChange={handleChange}>
                <option>Type</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>




          </div>



          {/* copie this? */}
          <div className={styles.formRight}>
            <div className={styles.addProductItem}>
              <label>Content</label>
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
