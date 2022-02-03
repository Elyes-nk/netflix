import styles from "./index.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "next/link";
import { useEffect } from "react";

export default function index() {
  const [lists, setLists] = useState([]);


  useEffect(() => {
    const getLists = async () =>{
        try {
          const res = await axios.get("/lists", {
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
      await axios.delete("/lists/" + id, {
        headers: {
          token: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
    } catch (err) {
    }
  };
  

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* editer le link */}
            <Link
              href={{ pathname: "/list/" + params.row._id, list: params.row }}
            >
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
    <div className={styles.productList}>
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
