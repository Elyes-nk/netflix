import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import styles from "./navbar.module.scss";
import Link from 'next/link'
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import logo from "../../../public/logo.png"
import profile from "../../../public/profile.png"

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
              src={logo.src}
              alt=""
            />
            <Link href="/" className={styles.link}>
              <span>Homepage</span>
            </Link>
            <Link href="/browse/series" className={styles.link}>
              <span className="navbarmainLinks">Series</span>
            </Link>
            <Link href="/browse/movies" className={styles.link}>
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
              src={profile.src}
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
