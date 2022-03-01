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
  const [serie, setSerie] = useState(null);
  useEffect(() => {
    const getSerie = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/series/find/${id}`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
          );
          setSerie(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
    }
    getSerie()
  }, [id]);

  const updateSerie = async () => {
    try {
     const res = await axios.put(`${process.env.API_URL}/series/${id}`
     , {
       serie
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
    {serie ? (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.product}>
        <div className={styles.productTitleContainer}>
          <h1 className={styles.productTitle}>Serie</h1>
          <Link href="/newSerie">
            <button className={styles.productAddButton}>Create</button>
          </Link>
        </div>
        <div className={styles.productTop}>
          <div className={styles.productTopRight}>
            <div className={styles.productInfoTop}>
              <img src={serie.img} alt="" className={styles.productInfoImg}/>
              <span className={styles.productName}>{serie.title}</span>
            </div>
            <div className={styles.productInfoBottom}>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Id:</span>
                <span className={styles.productInfoValue}>{serie._id}</span>
              </div>



              {/* importer les genres */}
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Genre:</span>
                {/* <span className={styles.productInfoValue}>{serie.genre}</span> */}
              </div>





              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Year:</span>
                <span className={styles.productInfoValue}>{serie.year}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Limit:</span>
                <span className={styles.productInfoValue}>{serie.limit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productBottom}>
          <form className={styles.productForm}>
            <div className={styles.productFormLeft}>
              <label>serie Title</label>
              <input 
                type="text"
                placeholder={serie.title} 
                onChange={(e) => setSerie({...serie, title:e.target.value})}
              />
              <label>Year</label>
              <input 
                type="text"
                placeholder={serie.year} 
                onChange={(e) => setSerie({...serie, year:e.target.value})}
              />



              {/* importer les genres */}
              <label>Genre</label>
              <input 
                type="text"
                // placeholder={serie.genre} 
                // onChange={(e) => setSerie({...genre, genre:e.target.value})}
              />
              {/* fin modifs  */}




              <label>Trailer</label>
              <input 
                type="text"
                placeholder={serie.trailer} 
                onChange={(e) => setSerie({...serie, trailer:e.target.value})}
              />



              {/* changer video en movies  */}
              <label>Video</label>
              <input 
                type="text"
                placeholder={serie.video} 
                onChange={(e) => setSerie({...serie, video:e.target.value})}
              />
              {/* fin modifs */}



              
            </div>

            <div className={styles.productFormRight}>
              <div className={styles.productUpload}>
                <img
                  src={serie.img}
                  alt=""
                  className={styles.productUploadImg}
                />
              </div>
              <button 
                onClick={()=>updateSerie()}
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
