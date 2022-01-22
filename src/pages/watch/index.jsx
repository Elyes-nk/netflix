import { ArrowBackOutlined } from "@material-ui/icons";
import Link from 'next/link'
import styles from "./watch.module.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  return (
    <div className={styles.watch}>
      <Link href="/">
        <div className={styles.back}>
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className={styles.video} autoPlay progress controls src={movie.video} />
    </div>
  );
}
