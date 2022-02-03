import styles from "./widgetLg.module.scss";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={styles.widgetLgButton}>{type}</button>;
  };
  return (
    <div className={styles.widgetLg}>
      <h3 className={styles.widgetLgTitle}>Latest transactions</h3>
      <table className={styles.widgetLgTable}>
        <tbody>
          <tr className={styles.widgetLgTr}>
            <th className={styles.widgetLgTh}>Customer</th>
            <th className={styles.widgetLgTh}>Date</th>
            <th className={styles.widgetLgTh}>Amount</th>
            <th className={styles.widgetLgTh}>Status</th>
          </tr>
          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Approved" />
            </td>
          </tr>
          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Declined" />
            </td>
          </tr>
          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Pending" />
            </td>
          </tr>
          <tr className={styles.widgetLgTr}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>Susan Carol</span>
            </td>
            <td className={styles.widgetLgDate}>2 Jun 2021</td>
            <td className={styles.widgetLgAmount}>$122.00</td>
            <td className={styles.widgetLgStatus}>
              <Button type="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
