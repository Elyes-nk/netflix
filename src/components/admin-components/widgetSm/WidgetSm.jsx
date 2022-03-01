import styles from "./widgetSm.module.scss";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/users?new=true`
        ,{
          headers: {
              token:JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
        );
        setNewUsers(res.data);
      } catch (err) {
      }
    };
    getNewUsers();
  }, []);
  
  return (
    <div className={styles.widgetSm}>
      <span className={styles.widgetSmTitle}>New Join Members</span>
      <ul className={styles.widgetSmList}>
        {newUsers.map((user) => (
          <li className={styles.widgetSmListItem}>
            <img
              src={
                user.profilePic ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt=""
              className={styles.widgetSmImg}
            />
            <div className={styles.widgetSmUser}>
              <span className={styles.widgetSmUsername}>{user.username}</span>
            </div>
            <Link href={`/admin/user/${user._id}`}>
              <button className={styles.widgetSmButton}>
                <Visibility className={styles.widgetSmIcon} />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
