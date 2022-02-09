import { useState } from "react";
import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";

export default function index() {
  const [subscribtion, setSubscribtion] = useState(null);

  const handleChange = (e) => {
    setSubscribtion({ ...subscribtion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSubscribtion(subscribtion);
  };

  const createSubscribtion = async (subscribtion) => {
    try {
      const res = await axios.post(`${process.env.API_URL}/subscribtions`
      , subscribtion
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
        <h1 className={styles.addProductTitle}>New Subscribtion</h1>
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


          <div className={styles.addProductItem}>
            <label>Amount</label>
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              onChange={handleChange}
            />
          </div>


          <div className={styles.addProductItem}>
            <label>Quality</label>
            <input
              type="text"
              placeholder="Quality"
              name="quality"
              onChange={handleChange}
            />
          </div>


          <div className={styles.addProductItem}>
            <label>Resolution</label>
            <input
              type="text"
              placeholder="Resolution"
              name="resolution"
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
