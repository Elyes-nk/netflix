import styles from "./index.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import axios from "axios";

export default function index() {

const [subscribtions, setSubscribtions] = useState([]);
  useEffect(() => {
    const getSubscribtions = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/subscribtions`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
          );
          setSubscribtions(res.data);
        } catch (err) {
        }
    }
    getSubscribtions()
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.API_URL}/subscribtions/${id}`, {
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
      field: "genre",
      headerName: "Subscribtions",
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
    { field: "name", headerName: "Name", width: 120 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "quality", headerName: "Quality", width: 120 },
    { field: "resolution", headerName: "Resolution", width: 120 },


    {
      field: "action",
      headerName: "Action",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/admin/subscribtions/genre/${params.row._id}`}>
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
          rows={subscribtions}
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
