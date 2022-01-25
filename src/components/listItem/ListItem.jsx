import styles from "./listItem.module.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link'
export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item
        // , {
        //   headers: {
        //     token:JSON.parse(localStorage.getItem("user")).accessToken,
        //   },
        // }
        );
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link href={{ pathname: "/watch", movie: movie }}>
      <div
        className={styles.listItem}
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className={styles.itemInfo}>
              <div className={styles.icons}>
                <PlayArrow className={styles.icon} />
                <Add className={styles.icon} />
                <ThumbUpAltOutlined className={styles.icon} />
                <ThumbDownOutlined className={styles.icon} />
              </div>
              <div className={styles.itemInfoTop}>
                <span>{movie.duration}</span>
                <span className={styles.limit}>+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className={styles.desc}>{movie.desc}</div>
              <div className={styles.genre}>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
