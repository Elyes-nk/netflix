import React from "react";
import styles from "./topbar.module.scss";
import profile from "../../../../public/profile.png";
import Link from "next/link";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topLeft}>
          <Link href="/">
            <span className={styles.logo}>NETFLIX</span>
          </Link>
        </div>
        <div className={styles.topRight}>
          <Link href='/profile'>
            <img src={profile.src} alt="" className={styles.topAvatar} />
          </Link>
        </div>
      </div>
    </div>
  );
}
