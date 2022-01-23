import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import styles from "./navbar.module.scss";
import Link from 'next/link'
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };
  return (
    <div className={styles.navbar}>
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className={styles.container}>
          <div className={styles.left}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
            <Link href="/" className={styles.link}>
              <span>Homepage</span>
            </Link>
            <Link href="/series" className={styles.link}>
              <span className="navbarmainLinks">Series</span>
            </Link>
            <Link href="/movies" className={styles.link}>
              <span className="navbarmainLinks">Movies</span>
            </Link>
            <span>New and Popular</span>
            <span>My List</span>
          </div>
          <div className={styles.right}>
            <Search className={styles.icon} />
            <span>KID</span>
            <Notifications className={styles.icon} />
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <div className={styles.profile}>
              <ArrowDropDown className={styles.icon} />
              <div className={styles.options}>
                <span>Settings</span>
                <span onClick={() => dispatch(logout())}>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
