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
  const [subscribtion, setSubscribtion] = useState(null);
  useEffect(() => {
    const getSubscribtion= async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/subscribtions/find/${id}`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
          );
          setSubscribtion(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
    }
    getSubscribtion()
  }, [id]);

  const handleChange = (e) => {
    setSubscribtion({ ...subscribtion, [e.target.name]: e.target.value });
  };

  const updateSubscribtion = async () => {
    try {
     const res = await axios.put(`${process.env.API_URL}/subscribtions/${id}`
     , {
       subscribtion
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
    {subscribtion ? (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.product}>
        <div className={styles.productTitleContainer}>
          <h1 className={styles.productTitle}>Subscribtion</h1>
          <Link href="/subscribtions/newSubscribtion">
            <button className={styles.productAddButton}>Create</button>
          </Link>
        </div>
        <div className={styles.productTop}>
          <div className={styles.productTopRight}>
            <div className={styles.productInfoBottom}>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Id:</span>
                <span className={styles.productInfoValue}>{subscribtion._id}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Name:</span>
                <span className={styles.productInfoValue}>{subscribtion.name}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Amount:</span>
                <span className={styles.productInfoValue}>{subscribtion.amount}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Quality:</span>
                <span className={styles.productInfoValue}>{subscribtion.quality}</span>
              </div>
              <div className={styles.productInfoItem}>
                <span className={styles.productInfoKey}>Resolution:</span>
                <span className={styles.productInfoValue}>{subscribtion.resolution}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productBottom}>
          <form className={styles.productForm}>
            <div className={styles.productFormLeft}>
              <label>Name</label>
              <input 
                type="text"
                name="name"
                placeholder={subscribtion.name} 
                onChange={handleChange}
              />
            </div>
            <div className={styles.productFormLeft}>
              <label>Amount</label>
              <input 
                type="text"
                name="amount"
                placeholder={subscribtion.amount} 
                onChange={handleChange}
              />
            </div> 
            <div className={styles.productFormLeft}>
              <label>quality</label>
              <input 
                type="text"
                name="quality"
                placeholder={subscribtion.quality} 
                onChange={handleChange}
              />
            </div> 
            <div className={styles.productFormLeft}>
              <label>Resolution</label>
              <input 
                type="text"
                name="resolution"
                placeholder={subscribtion.resolution} 
                onChange={handleChange}
              />
            </div>

            <div className={styles.productFormRight}>
              <button 
                onClick={()=>updateSubscribtion()}
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
