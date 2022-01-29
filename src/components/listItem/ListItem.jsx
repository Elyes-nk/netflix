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
import ReactPlayer from 'react-player/youtube'

export default function ListItem({ index, item }) {
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("http://localhost:3030/api/movies/find/" + item
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
    <Link href={`/watch/${movie._id}`}>
      <div
        className={styles.listItem}
        style={{ left: isItemHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsItemHovered(true)}
        onMouseLeave={() => setIsItemHovered(false)}
      >
         
        {isItemHovered ? 
        (
          <>
            <ReactPlayer
              className={styles.video} 
              playing={true}
              width="100%"
              height="50%"
              pip={false}
              url={movie.video} 
            />
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
              <div className={styles.genre}>
                {movie.genre.map((element) =>(
                  <span key={element.id}>{element.name}     </span>
                ))}
              </div>
            </div>
          </>
        )
        :
        <img 
          src={movie?.imgSm} 
          alt=""
        />
        }
      </div>
    </Link>
  );
}
