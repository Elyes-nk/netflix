import axios from "axios";
import { useRef, useState, useEffect, useContext } from "react";
import Router from 'next/router'
import styles from "./subscribtion.module.scss";
import logo from "../../../public/logo.png";
import withAuth from '../../middleware/withAuth'
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import { Check, CheckCircleOutline } from "@material-ui/icons";
import { loadStripe } from "@stripe/stripe-js";
import stripeService from "../../services/stripe.service";

const stripePromise = loadStripe("pk_test_51KHlC8C8XExSuQ3wbpTDJFyWflV64qb3YEwx21M9fUo1S8mv3JUFjs9rYsNe0PLEzFsWoeX4eyJuPgKfRUF2v1fe00BskIzVoI");


function index() {
  const { dispatch, user } = useContext(AuthContext);
  const [pageOne, setPageOne] = useState(true);
  const [subscribtions, setSubscribtions] = useState([]);
  const [subscribtionChoosed, setSubscribtionChoosed] = useState("");


  useEffect(() => {
    const getSubscribtions = async () => {
      try {
        const res = await axios.get(`http://localhost:3030/api/subscribtions/`
        // , {
        //   headers: {
        //     token:
        //       "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        //   },
        // }
        );
        setSubscribtions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubscribtions();
    console.log(subscribtions);
  }, []);


  const handleSubmit = async() => {
    try {
      const stripe = await stripePromise;
      const response = await stripeService.createSession(
        {
          userId: user.id,
          subscribtionId: subscribtionChoosed,
          subscribtionMounths: 1
        }
      );
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.subscribtion}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <img
            className={styles.logo}
            src={logo.src}
            alt=""
          />
          <button 
            className={styles.logout__button}
            onClick={() => {
              dispatch(logout())
              Router.push('/login')
              }
            }
          >
            Sign Out
          </button>
        </div>
      </div>
      {pageOne? 
      (
        <div className={styles.container}>
          <CheckCircleOutline  className={styles.check__icon}/>
          <p>Step 1/3</p>
          <h1>Choose your plan.</h1>
          <p><Check className={styles.check__icons}/> Without engagement. Cancelable at any time.</p>
          <p><Check className={styles.check__icons}/> All Netflix programs for a very attractive subscription.</p>
          <p><Check className={styles.check__icons}/> Unlimited access across all your devices.</p>
          <button 
            className={styles.subscribtion__button} 
            onClick={()=> setPageOne(false)}
          >
            Next
          </button>
        </div>
      ):(
        <div className={styles.second__container}>
          <p>Step 2/3</p>
          <h2>Select the package that suits you.</h2>
          <p><Check className={styles.check__icons}/> Watch as much as you want. Without advertising.</p>
          <p><Check className={styles.check__icons}/> Personalized recommendations.</p>
          <p><Check className={styles.check__icons}/> Change or cancel your plan at any time.</p>
          <div className={styles.tab__container}>
                    <table>
                    <thead>
                      <tr>
                        <td></td>
                        {subscribtions.map((element)=> (
                           <td 
                             key={element._id}
                           >
                              <button 
                                className={element._id === subscribtionChoosed ? styles.subscribtion__card__active : styles.subscribtion__card}
                                onClick={()=> setSubscribtionChoosed(element._id)}
                              >
                                {element.name}
                              </button>
                            </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mounthly subscribtion</td>
                        {subscribtions.map((element)=> (
                          <td 
                            className={element._id === subscribtionChoosed ? styles.red : ""}
                            key={element._id}
                          >
                            {element.amount} €
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td>Video quality</td>
                        {subscribtions.map((element)=> (
                          <td 
                            className={element._id === subscribtionChoosed ? styles.red : ""}
                            key={element._id}
                          >
                             {element.quality}
                          </td>       
                        ))}
                      </tr>
                      <tr>
                        <td>Resolution</td>
                        {subscribtions.map((element)=> (
                          <td 
                            className={element._id === subscribtionChoosed ? styles.red : ""}
                            key={element._id}
                          >
                            {element.resolution}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <p className={styles.users__conditions}>Changez ou annulez votre forfait à tout moment.</p>
                  <span className={styles.users__conditions}>Availability of HD (720p), Full HD (1080p), Ultra HD (4K), and HDR depends on your internet connection and device capabilities. Not all content is available in all resolutions. For more information, please see our Terms of Service.
                  Only people who live with you can use your account. Watch Netflix simultaneously on 4 different devices with the Premium plan, on 2 with the Standard plan, and on 1 with the Essential plan. </span>

                  <button 
                    className={styles.subscribtion__button} 
                    onClick={()=> handleSubmit()}
                  >
                    Next
                  </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default withAuth(index);