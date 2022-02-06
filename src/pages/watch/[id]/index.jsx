import { ArrowBackOutlined } from "@material-ui/icons";
import Link from 'next/link'
import styles from "./watch.module.scss";
import { useRouter } from "next/router";
import {useState, useEffect} from "react"
import ReactPlayer from 'react-player/youtube'
import axios from "axios";
import withAuth from '../../../middleware/withAuth';
import withSubscribtion from '../../../middleware/withSubscribtion';

function index() {
  const [movie, setMovie] = useState({});
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const findMovie = async () => {
      try{
        const res = await axios.get(`${process.env.API_URL}/movies/find/${id}`
          // , {
          //   headers: {
          //     token:JSON.parse(localStorage.getItem("user")).accessToken,
          //   },
          // }
          );
          setMovie(res.data);
      }catch(err){
        console.log(err);
      };
  }
  findMovie();
  }, []);

  return (
    <div className={styles.watch}>
      <Link href="/">
        <div className={styles.back}>
          <ArrowBackOutlined />
        </div>
      </Link>
      <ReactPlayer
        className={styles.video} 
        playing={true} 
        width="100%" 
        height="100%" 
        pip={false} 
        controls={true} 
        url={movie.video} 
      />
    </div>
  );
}
export default withAuth(withSubscribtion(index))