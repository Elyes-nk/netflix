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
import { Link } from "next/link";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Dashboard</h3>
          <ul className={styles.sidebarList}>
            <Link href="/" className={styles.link}>
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
            <Link href="/users" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PermIdentity className={styles.sidebarIcon} />
                Users
              </li>
            </Link>
            <Link href="/movies" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <PlayCircleOutline className={styles.sidebarIcon} />
                Movies
              </li>
            </Link>
            <Link href="/lists" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <List className={styles.sidebarIcon} />
                Lists
              </li>
            </Link>
            <Link href="/newMovie" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <AddToQueue className={styles.sidebarIcon} />
                Add Movie
              </li>
            </Link>
            <Link href="/newList" className={styles.link}>
              <li className={styles.sidebarListItem}>
                <QueuePlayNext className={styles.sidebarIcon} />
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Notifications</h3>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarListItem}>
              <MailOutline className={styles.sidebarIcon} />
              Mail
            </li>
            <li className={styles.sidebarListItem}>
              <DynamicFeed className={styles.sidebarIcon} />
              Feedback
            </li>
            <li className={styles.sidebarListItem}>
              <ChatBubbleOutline className={styles.sidebarIcon} />
              Messages
            </li>
          </ul>
        </div>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Staff</h3>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarListItem}>
              <WorkOutline className={styles.sidebarIcon} />
              Manage
            </li>
            <li className={styles.sidebarListItem}>
              <Timeline className={styles.sidebarIcon} />
              Analytics
            </li>
            <li className={styles.sidebarListItem}>
              <Report className={styles.sidebarIcon} />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
