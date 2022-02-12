import styles from "./widgetLg.module.scss";
import {useState, useEffect} from "react";
import axios from "axios";

export default function WidgetLg() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/transactions`
        ,{
          headers: {
              token:JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
        );
        setTransactions(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getTransactions();
  }, []);
  

  const Button = ({ type }) => {
    switch (type){
      case "Approved": return <button className={styles.widgetLgButton__approved}>{type}</button>;
      case "Pending": return <button className={styles.widgetLgButton__pending}>{type}</button>;
      case "Declined": return <button className={styles.widgetLgButton__declined}>{type}</button>;
    
      default: return <button className={styles.widgetLgButton}>{type}</button>;
    }
  };

  return (
    <div className={styles.widgetLg}>
      <h3 className={styles.widgetLgTitle}>Latest transactions</h3>



      <table className={styles.widgetLgTable}>
        <tbody>
          <tr className={styles.widgetLgTr}>
            <th className={styles.widgetLgTh}>Customer</th>
            <th className={styles.widgetLgTh}>Date</th>
            <th className={styles.widgetLgTh}>Subscribtion</th>
            <th className={styles.widgetLgTh}>Status</th>
          </tr>

          {/* {transactions.map((transaction)=> 
            <tr className={styles.widgetLgTr} key={transaction._id}>
              <td className={styles.widgetLgUser}>
                <img
                  src={transaction.user.profilePic ? transaction.user.profilePic : "https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }
                  alt=""
                  className={styles.widgetLgImg}
                />
                <span className={styles.widgetLgName}>{transaction.user.username}</span>
              </td>
              <td className={styles.widgetLgDate}>{transaction.date}</td>
              <td className={styles.widgetLgAmount}>{transaction.subscribtion.name}</td>
              <td className={styles.widgetLgStatus}>
                <Button type={transaction.status} />
              </td>
          </tr>
          )} */}


          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Approved" />
            </td>
          </tr>



          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Declined" />
            </td>
          </tr>




          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Pending" />
            </td>
          </tr>



          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Approved" />
            </td>
          </tr>




        </tbody>
      </table>
    </div>
  );
}
