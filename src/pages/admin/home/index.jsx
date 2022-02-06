// import Chart from "../../../components/admin-components/chart/Chart";
import FeaturedInfo from "../../../components/admin-components/featuredInfo/FeaturedInfo";
import styles from "./index.module.scss";
import WidgetSm from "../../../components/admin-components/widgetSm/WidgetSm"
import WidgetLg from "../../../components/admin-components/widgetLg/WidgetLg";
import Topbar from "../../../components/admin-components/topbar/Topbar";
import Sidebar from "../../../components/admin-components/sidebar/Sidebar";
import Chart from "../../../components/admin-components/chart/Chart";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function index() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${process.env.API_URL}/users/stats`
        // ,{
        //   headers: {
          //  token: JSON.parse(localStorage.getItem("user")).accessToken,
        // }
        );
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  return (
    <>
    <Topbar />
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.home}>
        <FeaturedInfo />
        <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
        <div className={styles.homeWidgets}>
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </div>
    </>
  );
}
