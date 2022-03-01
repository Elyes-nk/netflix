import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./featured.module.scss";
import Link from "next/link";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/genres/`
        , {
          headers: {
            token: JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
        );
        setCategories(res.data);
      } catch (err) {
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/${type ? type : "movies"}/random`
        , {
          headers: {
            token: JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
        );
        setContent(res.data[0]);
      } catch (err) {
      }
    };
    getRandomContent();
  }, [type]);


  return (
    <div className={styles.featured}>
      {type && (
        <div className={styles.category}>
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
              <option value="">Genres</option>
              {categories?.map((element)=> (
                <option key={element._id} value={element._id}>{element.name}</option>
              ))}
          </select>

        </div>
      )}
      <img src={content.img} className={styles.img} alt=""/> 
      <div className={styles.info}>
        <img src={content.imgTitle} alt="" />
        <span className={styles.desc}>{content.desc}</span>
        <div className={styles.buttons}>
          <Link href={`/watch/${content._id}`}>
            <button className={styles.play}>
              <PlayArrow className={styles.icon} />
              <span>  Play</span>
            </button>
          </Link>
          <button className={styles.more}>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
