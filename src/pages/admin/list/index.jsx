import { Link } from "next/link";
import styles from "./index.module.scss";

export default function index() {

  //editer le uselocation
  // const location = useLocation();
  // const list = location.list;

  
  return (
    <div className={styles.product}>
        <div className={styles.productTitleContainer}>
          <h1 className={styles.productTitle}>List</h1>
          <Link href="/newList">
            <button className={styles.productAddButton}>Create</button>
          </Link>
        </div>
      <div className={styles.productTop}>
        <div className={styles.productTopRight}>
          <div className={styles.productInfoTop}>
            <span className={styles.productName}>{list.title}</span>
          </div>
          <div className={styles.productInfoBottom}>
            <div className={styles.productInfoItem}>
              <span className={styles.productInfoKey}>id:</span>
              <span className={styles.productInfoValue}>{list._id}</span>
            </div>
            <div className={styles.productInfoItem}>
              <span className={styles.productInfoKey}>genre:</span>
              <span className={styles.productInfoValue}>{list.genre}</span>
            </div>
            <div className={styles.productInfoItem}>
              <span className={styles.productInfoKey}>type:</span>
              <span className={styles.productInfoValue}>{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productBottom}>
        <form className={styles.productForm}>
          <div className={styles.productFormLeft}>
            <label>List Title</label>
            <input type="text" placeholder={list.title} />
            <label>Type</label>
            <input type="text" placeholder={list.type} />
            <label>Genre</label>
            <input type="text" placeholder={list.genre} />
          </div>
          <div className={styles.productFormRight}>
            <button className={styles.productButton}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
