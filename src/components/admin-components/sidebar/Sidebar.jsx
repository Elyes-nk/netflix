import styles from "./sidebar.module.scss";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  PlayCircleOutline,
  List,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  AddToQueue,
  QueuePlayNext,
} from "@material-ui/icons";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Dashboard</h3>
          <ul className={styles.sidebarList}>
            <Link href="/admin/" className={styles.link}>
              <li className={styles.sidebarListItem__active}>
                <LineStyle className={styles.sidebarIcon}/>
                Home
              </li>
            </Link>
            <li className={styles.sidebarListItem}>
              <Timeline className={styles.sidebarIcon}/>
              Analytics
            </li>
            <li className={styles.sidebarListItem}>
              <TrendingUp className={styles.sidebarIcon} />
              Sales
            </li>
          </ul>
        </div>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Quick Menu</h3>
          <ul className={styles.sidebarList}>
            <Link href="/admin/users" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PermIdentity className={styles.sidebarIcon} />
                Users
              </li>
            </Link>
            <Link href="/admin/movies" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PlayCircleOutline className={styles.sidebarIcon} />
                Movies
              </li>
            </Link>
            <Link href="/admin/series" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PlayCircleOutline className={styles.sidebarIcon} />
                Series
              </li>
            </Link>
            <Link href="/admin/lists" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <List className={styles.sidebarIcon} />
                Lists
              </li>
            </Link>
            <Link href="/admin/categories" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <List className={styles.sidebarIcon} />
                Categories
              </li>
            </Link>
            <Link href="/admin/subscribtions" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <List className={styles.sidebarIcon} />
                Subscribtions
              </li>
            </Link>
            <Link href="/admin/newMovie" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <AddToQueue className={styles.sidebarIcon} />
                Add Serie
              </li>
            </Link>
            <Link href="/admin/newSerie" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <AddToQueue className={styles.sidebarIcon} />
                Add Movie
              </li>
            </Link>
            <Link href="/admin/newList" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <QueuePlayNext className={styles.sidebarIcon} />
                Add List
              </li>
            </Link>
            <Link href="/admin/newCategory" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <QueuePlayNext className={styles.sidebarIcon} />
                Add Category
              </li>
            </Link>
            <Link href="/admin/newSubscribtion" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <QueuePlayNext className={styles.sidebarIcon} />
                Add Subscribtion
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
