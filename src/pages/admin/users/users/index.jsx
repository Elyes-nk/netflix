import styles from "./index.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import axios from "axios";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';

function index() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () =>{
        try {
          const res = await axios.get(`${process.env.API_URL}/users`
          , {
            headers: {
              token: JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setUsers(res.data);
        } catch (err) {
        }
    }
    getUsers()
  }, []);



  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.API_URL}/users/${id}`
      , {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {
    }
  };

  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.userListUser}>
            <img className={styles.userListImg} src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/admin/users/user/${params.row.id}`}>
              <button className={styles.userListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={styles.userListDelete}
              onClick={() => handleDelete(params.row.id)}
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
      <div className={styles.userList}>
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          style={{color:"#e5e5e5"}}
        />
      </div>
    </div>
  </>
  );
}
export default withAuth(withAdmin(index))
