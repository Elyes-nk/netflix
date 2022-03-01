import styles from "./index.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Link from "next/link";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';

function index() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getLists = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/lists`, {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setLists(res.data);
        } catch (err) {
        }
    }
    getLists()
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.API_URL}/lists/${id}`
      , {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {
    }
  };
  

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250  },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/admin/lists/list/${params.row._id}`}>
              <button className={styles.productListEdit}>Edit</button>
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
          rows={lists}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
          style={{color:"#e5e5e5"}}
        />
      </div>
    </div>
    </>
  );
}
export default withAuth(withAdmin(index))
