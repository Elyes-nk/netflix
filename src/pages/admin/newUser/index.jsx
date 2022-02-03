import styles from "./index.module.scss";

export default function NewUser() {
  return (
    <div className={styles.newUser}>
      <h1 className={styles.newUserTitle}>New User</h1>
      <form className={styles.newUserForm}>
        <div className={styles.newUserItem}>
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div>
        <div className={styles.newUserItem}>
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className={styles.newUserItem}>
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className={styles.newUserItem}>
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>
        <div className={styles.newUserItem}>
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className={styles.newUserItem}>
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className={styles.newUserItem}>
          <label>Gender</label>
          <div className={styles.newUserGender}>
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className={styles.newUserItem}>
          <label>Active</label>
          <select className={styles.newUserSelect} name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className={styles.newUserButton}>Create</button>
      </form>
    </div>
  );
}
