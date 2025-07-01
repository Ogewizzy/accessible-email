
import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h2>Welcome to Your Dashboard</h2>
      <p>Select an option from the sidebar to get started.</p>
    </div>
  );
};

export default Dashboard;