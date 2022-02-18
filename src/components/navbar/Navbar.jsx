import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import styles from "./navbar.module.scss";
import Link from 'next/link'
import { Context } from "../../Context/Context";
import { logout } from "../../Context/Actions";
import logo from "../../../public/logo.png"
import profile from "../../../public/profile.png"
import Router from 'next/router'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const { dispatch, user, setSearch } = useContext(Context);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  } 
  return (
    <div className={styles.navbar}>
      <div className={isScrolled ? styles.scrolled : styles.not__scrolled}>
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
              <span>Series</span>
            </Link>
            <Link href="/browse/movies" className={styles.link}>
              <span>Movies</span>
            </Link>
            <span>New and Popular</span>
            <Link href="/my-list" className={styles.link}>
              <span>My List</span>
            </Link>
          </div>
          <div className={styles.right}>
            <Search 
              className={styles.icon} 
              onClick={()=>setSearchBar(!searchBar)}
            />
            {searchBar && 
                <input
                  className={styles.search} 
                  placeholder="Titles, movies, series"
                  onBlur={()=>{
                    setSearchBar(false);
                    setSearch(null)
                  }}
                  onChange={(e)=>setSearch(e.target.value)}
                /> 
            }
            <span>{user?.username}</span>
            <Notifications className={styles.icon} />
            <Link href="/profile">
              <img
                src={user?.profilePic ? user.profilePic : profile.src}
                alt=""
              />
            </Link>
            <div className={styles.profile}>
              <ArrowDropDown className={styles.icon} />
              <div className={styles.options}>
                {user?.isAdmin && ( 
                  <Link href="/admin/home" className={styles.link}>
                    <span>Admin</span>
                  </Link>
                )}
                <Link href="/profile" className={styles.link}>
                  <span>Settings</span>
                </Link>
                <span 
                  onClick={() => {
                    dispatch(logout())
                    Router.push('/login')
                    }
                  }
                >
                  Sign Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
