import { useContext, useState } from "react";
import styles from "./index.module.scss";
import storage from "../../firebase";
import Topbar from "../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../components/admin-components/sidebar/Sidebar";

export default function index() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);



  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie);
  };

  const createMovie = async (movie) => {
    try {
      const res = await axios.post("http://localhost:3030/api/movies", movie, {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {
    }
  };

  return (
    <>
    <Topbar />
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.newProduct}>
        <h1 className={styles.addProductTitle}>New Movie</h1>
        <form className={styles.addProductForm}>
          <div className={styles.addProductItem}>
            <label>Image</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Title image</label>
            <input
              type="file"
              id="imgTitle"
              name="imgTitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Thumbnail image</label>
            <input
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Title</label>
            <input
              type="text"
              placeholder="John Wick"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Description</label>
            <input
              type="text"
              placeholder="description"
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Genre</label>
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Duration</label>
            <input
              type="text"
              placeholder="Duration"
              name="duration"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Limit</label>
            <input
              type="text"
              placeholder="limit"
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className={styles.addProductItem}>
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
          </div>
          <div className={styles.addProductItem}>
            <label>Video</label>
            <input
              type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          {uploaded === 5 ? (
            <button className={styles.addProductButton} onClick={handleSubmit}>
              Create
            </button>
          ) : (
            <button className={styles.addProductButton} onClick={handleUpload}>
              Upload
            </button>
          )}
        </form>
      </div>
    </div>
  </>
  );
}
