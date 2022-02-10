import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Topbar from "../../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../../components/admin-components/sidebar/Sidebar";
import {useState, useEffect} from 'react';
import axios from "axios";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';

function index() {
  
  const router = useRouter();
  const id = router.query.id;
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getMovie = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/movies/find/${id}`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
          );
          setMovie(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
    }
    getMovie()
  }, [id]);

  const updateMovie = async () => {
    try {
     const res = await axios.put(`${process.env.API_URL}/movies/${id}`
     , {
       movie
     }
     , {
       headers: {
         token:JSON.parse(localStorage.getItem("user")).accessToken,
       },
     }
     );
   } catch (err) {
   }
 }

  return (
      <>
    <Topbar />
    {movie ? (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.product}>
        <div className={styles.productTitleContainer}>
          <h1 className={styles.productTitle}>Movie</h1>
          <Link href="/newMovie">
            <button className={styles.productAddButton}>Create</button>
          </Link>
        </div>
        <div className={styles.productTop}>
          <div className={styles.productTopRight}>
            <div className={styles.productInfoTop}>
              <img src={movie.img} alt="" className={styles.productInfoImg}/>
              <span className={styles.productName}>{movie.title}</span>
            </div>
            <div className={styles.productInfoBottom}>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Id:</span>
                <span className={styles.productInfoValue}>{movie._id}</span>
              </div>


              {/* importer les genres */}
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Genre:</span>
                {/* <span className={styles.productInfoValue}>{movie.genre}</span> */}
              </div>




              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Year:</span>
                <span className={styles.productInfoValue}>{movie.year}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Limit:</span>
                <span className={styles.productInfoValue}>{movie.limit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productBottom}>
          <form className={styles.productForm}>
            <div className={styles.productFormLeft}>
              <label>Movie Title</label>
              <input 
                type="text"
                placeholder={movie.title} 
                onChange={(e) => setMovie({...movie, title:e.target.value})}
              />
              <label>Year</label>
              <input 
                type="text"
                placeholder={movie.year} 
                onChange={(e) => setMovie({...movie, year:e.target.value})}
              />




              {/* importer les genres */}
              <label>Genre</label>
              <input 
                type="text"
                // placeholder={movie.genre} 
                // onChange={(e) => setMovie({...genre, genre:e.target.value})}
              />




              
              <label>Trailer</label>
              <input 
                type="text"
                placeholder={movie.trailer} 
                onChange={(e) => setMovie({...movie, trailer:e.target.value})}
              />
              <label>Video</label>
              <input 
                type="text"
                placeholder={movie.video} 
                onChange={(e) => setMovie({...movie, video:e.target.value})}
              />
            </div>

            <div className={styles.productFormRight}>
              <div className={styles.productUpload}>
                <img
                  src={movie.img}
                  alt=""
                  className={styles.productUploadImg}
                />
              </div>
              <button 
                onClick={()=>updateMovie()}
                className={styles.productButton}
              >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
    :
    <h1>Chargement</h1>
    }
  </>
  );
}
export default withAuth(withAdmin(index))
