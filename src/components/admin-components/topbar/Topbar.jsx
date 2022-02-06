import React from "react";
import styles from "./topbar.module.scss";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import profile from "../../../../public/profile.png"


export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topLeft}>
          <span className={styles.logo}>NETFLIX</span>
        </div>
        <div className={styles.topRight}>
          {/* <div className={styles.topbarIconContainer}>
            <NotificationsNone />
            <span className={styles.topIconBadge}>2</span>
          </div>
          <div className={styles.topbarIconContainer}>
            <Language />
            <span className={styles.topIconBadge}>2</span>
          </div>
          <div className={styles.topbarIconContainer}>
            <Settings />
          </div> */}
          <img src={profile.src} alt="" className={styles.topAvatar} />
        </div>
      </div>
    </div>
  );
}
