import { Link } from "next/link";
import styles from "./index.module.scss";
import { Publish } from "@material-ui/icons";

export default function index() {

  // //editer use location
  // const location = useLocation();
  // const movie = location.movie;

  
  return (
      <>
    <Topbar />
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.product}>
        <div className={styles.productTitleContainer}>
          <h1 className={styles.productTitle}>Movie</h1>
          <Link href="/newproduct">
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
                <span className={styles.productInfoKey}>id:</span>
                <span className={styles.productInfoValue}>{movie._id}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>genre:</span>
                <span className={styles.productInfoValue}>{movie.genre}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>year:</span>
                <span className={styles.productInfoValue}>{movie.year}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>limit:</span>
                <span className={styles.productInfoValue}>{movie.limit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productBottom}>
          <form className={styles.productForm}>
            <div className={styles.productFormLeft}>
              <label>Movie Title</label>
              <input type="text" placeholder={movie.title} />
              <label>Year</label>
              <input type="text" placeholder={movie.year} />
              <label>Genre</label>
              <input type="text" placeholder={movie.genre} />
              <label>Limit</label>
              <input type="text" placeholder={movie.limit} />
              <label>Trailer</label>
              <input type="file" placeholder={movie.trailer} />
              <label>Video</label>
              <input type="file" placeholder={movie.video} />
            </div>
            <div className={styles.productFormRight}>
              <div className={styles.productUpload}>
                <img
                  src={movie.img}
                  alt=""
                  className={styles.productUploadImg}
                />
                <label for="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className={styles.productButton}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}
