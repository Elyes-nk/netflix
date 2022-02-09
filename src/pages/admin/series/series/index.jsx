import styles from "./index.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import axios from "axios";

export default function index() {

const [series, setSeries] = useState([]);
  useEffect(() => {
    const getSeries = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/series`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
          );
          setSeries(res.data);
        } catch (err) {
        }
    }
    getSeries()
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.API_URL}/series/${id}`, {
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
      field: "serie",
      headerName: "Serie",
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
    {
      field: "action",
      headerName: "Action",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/admin/series/serie/${params.row._id}`}>
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
          rows={series}
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
