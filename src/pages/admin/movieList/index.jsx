import styles from "./index.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "next/link";
import { useState, useEffect } from "react";

export default function index() {

const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () =>{
        try {
          const res = await axios.get("/movies", {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setMovies(res.data);
        } catch (err) {
        }
    }
    getMovies()
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete("/movies/" + id, {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {
    }
  };

  

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.productListItem}>
            <img className={styles.productListImg} src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              href={{ pathname: "/movie/" + params.row._id, movie: params.row }}
            >
              <button className={styles.productListEdit} >Edit</button>
            </Link>
            <DeleteOutline
              className={styles.productListDelete} 
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
    <Topbar />
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.productList}>
        <DataGrid
          rows={movies}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      </div>
    </div>
  </>
  );
}
