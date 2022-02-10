import styles from "./index.module.scss";
import Topbar from "../../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../../components/admin-components/sidebar/Sidebar";
import withAuth from '../../../../middleware/withAuth';
import withAdmin from '../../../../middleware/withAdmin';

function index() {
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user);
  };

  const createUser = async (user) => {
    try {
      const res = await axios.post(`${process.env.API_URL}/users`
      , user
      , {
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
      <div className={styles.newUser}>
        <h1 className={styles.newUserTitle}>New User</h1>
        <form className={styles.newUserForm}>
          <div className={styles.newUserItem}>
            <label>Username</label>
            <input 
            type="text" 
            placeholder="Username"
            name="username"
            onChange={handleChange}
            />
          </div>
          <div className={styles.newUserItem}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="john@gmail.com" 
              name="email"
              onChange={handleChange}/>
          </div>
          <div className={styles.newUserItem}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="password" 
              name="password"
              onChange={handleChange}/>
          </div>
          <div className={styles.newUserItem}>
            <label>Admin</label>
            <select 
              className={styles.newUserSelect} 
              name="isAdmin" 
              id="active">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button 
            className={styles.newUserButton}
            onClick={handleSubmit}
          >Create</button>
        </form>
      </div>
    </div>
  </>
  );
}
export default withAuth(withAdmin(index))
