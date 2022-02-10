import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import Link from "next/link";
import styles from "./index.module.scss";
import Topbar from "../../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../../components/admin-components/sidebar/Sidebar";
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import axios from 'axios';
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';

function index() {

  const router = useRouter();
  const id = router.query.id;
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/users/find/${id}`
          // , {
          //   headers: {
          //     token: JSON.parse(localStorage.getItem("user")).accessToken,
          //   },
          // }
          );
          setUser(res.data);
        } catch (err) {
        }
    }
    getUser()
  }, [id]);

  const updateUser = async () => {
    try {
     const res = await axios.put(`${process.env.API_URL}/users/${id}`
     ,{
       user
     }
     // , {
     //   headers: {
     //     token:JSON.parse(localStorage.getItem("user")).accessToken,
     //   },
     // }
     );
   } catch (err) {
   }
 }
 
  return (
    <>
    <Topbar />
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.user}>
        <div className={styles.title__container}>
          <h1 className={styles.title}>Edit User</h1>
          <Link href="/newUser">
            <button className={styles.add__button}>Create</button>
          </Link>
        </div>
        <div className={styles.user__container}>
          <div className={styles.user__show}>
                    <div className={styles.user__show__top}>
                        <img
                          src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                          alt=""
                          className={styles.user__show__img}
                        />
                        <div className={styles.user__show__top__title}>
                          <span className={styles.user__show__username}>{user.username}</span>
                          <span className={styles.user__show__user__title}>{user.isAdmin ? "Administrator" : "User"}</span>
                        </div>
                    </div>
                    <div className={styles.user__show__bottom}>
                      <span className={styles.user__show__title}>Account Details</span>
                      <div className={styles.user__show__info}>
                        <PermIdentity className={styles.user__show__icon} />
                        <span className={styles.user__show__title}>{user.username}</span>
                      </div>
                      <div className={styles.user__show__info}>
                        <CalendarToday className={styles.user__show__icon} />
                        <span className={styles.user__show__title}>{user.createdAt}</span>
                      </div>

                      <span className={styles.user__show__title}>Contact Details</span>
                      <div className={styles.user__show__info}>
                        <MailOutline className={styles.user__show__icon} />
                        <span className={styles.user__show__title}>{user.email}</span>
                      </div>
                    </div>
          </div>
          <div className={styles.user__update}>
            <span className={styles.user__update__title}>Edit</span>
            <form className={styles.user__update__form}>
              <div className={styles.userUpdateLeft}>
                <div className={styles.user__update__item}>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user.username}
                    onChange={(e) => setUser({...user, username:e.target.value})}
                    className={styles.user__update__input}
                  />
                </div>
                <div className={styles.user__update__item}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    className={styles.user__update__input}
                  />
                </div>
              </div>
              <div className={styles.user__update__right}>
                <div className={styles.user__update__upload}>
                  <img
                    className={styles.user__update__img}
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className={styles.user__update__icon} />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button 
                  className={styles.user__update__button}
                  onClick={()=>updateUser()}
                >Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
export default withAuth(withAdmin(index))
