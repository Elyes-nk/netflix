import styles from "./listItem.module.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from 'next/link';
import ReactPlayer from 'react-player/youtube';
import { AuthContext } from "../../authContext/AuthContext";
import { updateFailure, updateSuccess, updateStart } from "../../authContext/AuthActions";

export default function ListItem({ index, id }) {
  const { user, dispatch } = useContext(AuthContext);
  const [movie, setMovie] = useState({});
  const [inWichlist, setInWichlist] = useState(user?.wichlist.find((item) => item === id) ? true : false );
  const [isItemHovered, setIsItemHovered] = useState(false);

  useEffect(() => {
    setInWichlist(user?.wichlist.find((item) => item === id) ? true : false );
  }, [user]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("http://localhost:3030/api/movies/find/" + id
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
  }, []);

 
  const updateWichlist = () => {
    if(inWichlist){
      const wichlistFiltred = user?.wichlist.filter((item) => item !== id)
      updateUser(wichlistFiltred)
    }else{
      updateUser([...user?.wichlist, id]);
    }
  }

  const updateUser = async (wichlist) => {
     dispatch(updateStart())
     try {
      const res = await axios.put("http://localhost:3030/api/users/"+ user._id
      ,{
        wichlist:wichlist
      }
      // , {
      //   headers: {
      //     token:JSON.parse(localStorage.getItem("user")).accessToken,
      //   },
      // }
      );
      setInWichlist(!inWichlist);
      dispatch(updateSuccess(res.data));
    } catch (err) {
      dispatch(updateFailure());
    }
  }
  
  return (
      <div
        className={styles.listItem}
        style={{ left: isItemHovered && index * 225 - 50 + index * 2.5 }}
        //activate hoover
        onMouseEnter={() => setIsItemHovered(true)}
        //disable hoover
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
                <Link href={`/watch/${movie._id}`}>
                  <PlayArrow className={styles.icon} />
                </Link>
                {inWichlist ?
                  <Add 
                    className={styles.icon__active} 
                    onClick={()=> updateWichlist()}
                  />
                  :
                  <Add 
                    className={styles.icon} 
                    onClick={()=> updateWichlist()}
                  />
                }
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
                {movie.genre.map((element, i) =>(
                  <span key={i}>{element.name}     </span>
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
  );
}
