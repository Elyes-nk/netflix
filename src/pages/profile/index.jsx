import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Router from 'next/router'
import styles from "./index.module.scss";
import logo from "../../../public/logo.png";
import profile from "../../../public/profile.png"
import withAuth from '../../middleware/withAuth'
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import Link from "next/link";
import { updateFailure, updateSuccess, updateStart } from "../../authContext/AuthActions";

function index() {
  const { dispatch, user } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const [subscribtion, setSubscribtion] = useState(null);


  useEffect(() => {
    const getSubscribtion = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/subscribtions/`
        , {
          headers: {
            token: JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
        );
        setSubscribtion(res.data.find((sub)=> sub._id === user.subscribtion));
      } catch (err) {
        console.log(err);
      }
    };
    getSubscribtion();
  }, []);


  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };
  
  const handleUpdate = async() => {
    dispatch(updateStart())
     try {
      const res = await axios.put(`${process.env.API_URL}/users/${user._id}`
      ,editedUser
      , {
        headers: {
           token:JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
      );
      setEditMode(false);
      dispatch(updateSuccess(res.data));
    } catch (err) {
      dispatch(updateFailure());
    }
  }
  return (
    <div className={styles.subscribtion}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <Link href="/browse/random">
            <img
              className={styles.logo}
              src={logo.src}
              alt=""
            />
          </Link>
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
      {!editMode? 
      (
        <div className={styles.container}>
          <img
              src={user.profilePic ? user.profilePic : profile.src}
              className={styles.profile__pic}
          />
          <div className={styles.informations}>
            <h1>Profile</h1>
            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>
            <p>Subscribtion : {editedUser.subscribtion ? subscribtion?.name : "You don't have a subscribtion"}</p>
          </div>
          <button 
            className={styles.button} 
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </div>
      ):(
        <div className={styles.edit__container}>
          <img
              src={user.profilePic ? user.profilePic : profile.src}
              className={styles.profile__pic}
          />
          <div className={styles.form}>
            <h1>Edit Profile</h1>
            <div className={styles.addProductItem}>
              <label>Username</label>
              <input
                type="text"
                placeholder={user.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className={styles.addProductItem}>
              <label>Email</label>
              <input
                type="text"
                placeholder={user.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className={styles.addProductItem}>
              <label>Profile picture</label>
              <input
                type="text"
                placeholder={user.profilePic}
                name="profilePic"
                onChange={handleChange}
              />
            </div>
             {editedUser.subscribtion ? (
                <button 
                  onClick={() => setEditedUser({ ...editedUser, subscribtion:null, subscribtionDate:null, subscribtionMounths:0 })}
                  className={styles.subscribtion__button}
                >
                  Cancel subscribtion
                </button>
              ):(
                <div className={styles.addProductItem}>
                <label>You no longer have a subscribtion.</label>
                </div>
              )
              }
          </div>
          <button 
            className={styles.button} 
            onClick={() => handleUpdate(editedUser)}
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}
export default withAuth(index);