import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Topbar from "../../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../../components/admin-components/sidebar/Sidebar";
import {useState, useEffect} from 'react';
import axios from "axios";
import withAuth from '../../../../../middleware/withAuth';
import withAdmin from '../../../../../middleware/withAdmin';

function index() {
  const router = useRouter();
  const id = router.query.id;
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getGenre = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/genres/find/${id}`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
          );
          setGenre(res.data);
        } catch (err) {
        }
    }
    getGenre()
  }, [id]);

  const updateGenre = async () => {
    try {
     const res = await axios.put(`${process.env.API_URL}/genres/${id}`
     , {
       genre
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
    {genre ? (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.product}>
        <div className={styles.productTitleContainer}>
          <h1 className={styles.productTitle}>Genre</h1>
          <Link href="/admin/genres/newGenre">
            <button className={styles.productAddButton}>Create</button>
          </Link>
        </div>
        <div className={styles.productTop}>
          <div className={styles.productTopRight}>
            <div className={styles.productInfoBottom}>

              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Id:</span>
                <span className={styles.productInfoValue}>{genre._id}</span>
              </div>

              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Name:</span>
                <span className={styles.productInfoValue}>{genre.name}</span>
              </div>
             
            </div>
          </div>
        </div>
        <div className={styles.productBottom}>
          <form className={styles.productForm}>
            <div className={styles.productFormLeft}>
              <label>genre Title</label>
              <input 
                type="text"
                placeholder={genre.name} 
                onChange={(e) => setGenre({...genre, title:e.target.value})}
              />
            </div>

            <div className={styles.productFormRight}>
              <button 
                onClick={()=>updateGenre()}
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
