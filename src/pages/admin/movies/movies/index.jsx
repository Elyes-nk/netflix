import styles from "./index.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import axios from "axios";

export default function index() {

const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/movies`
          // , {
          //   headers: {
          //     token: JSON.parse(localStorage.getItem("user")).accessToken,
          //   },
          // }
          );
          setMovies(res.data);
        } catch (err) {
        }
    }
    getMovies()
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.API_URL}/movies/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {
    }
  };

  

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "movie",
      headerName: "Movie",
      width: 240,
      renderCell: (params) => {
        return (
          <div className={styles.productListItem}>
            <img className={styles.productListImg} src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    //import genres .name
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 110 },
    { field: "limit", headerName: "Limit", width: 110 },
    { field: "isSeries", headerName: "Serie?", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/admin/movies/movie/${params.row._id}`}>
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
          root={false}
          checkboxSelection
          getRowId={(r) => r._id}
          style={{color:"#e5e5e5"}}
        />
      </div>
    </div>
  </>
  );
}
