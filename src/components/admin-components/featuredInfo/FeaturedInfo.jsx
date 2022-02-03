import styles from "./featuredInfo.module.scss";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className={styles.featured}>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Revanue</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>$2,415</span>
          <span className={styles.featuredMoneyRate}>
            -11.4 <ArrowDownward  className={styles.featuredIcon__negative}/>
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Sales</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>$4,415</span>
          <span className={styles.featuredMoneyRate}>
            -1.4 <ArrowDownward className={styles.featuredIcon__negative}/>
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Cost</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>$2,225</span>
          <span className={styles.featuredMoneyRate}>
            +2.4 <ArrowUpward className={styles.featuredIcon}/>
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
    </div>
  );
}
