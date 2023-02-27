import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PostEstablishment from "../admin/components/PostEstablishment";
import ReservedFetch from "../admin/components/ReservedFetch";
import styles from "../App.module.css";
import AllPlaces from "../components/AllPlaces";
import Header from "../components/layout/Header";
import AuthContext from "../context/AuthContext";
import FormFetch from "./components/FormFetch";

export default function AdminPanel() {
  const [auth] = useContext(AuthContext);

  const navigate = useNavigate();

  const user = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (!auth) {
      console.log("Not logged in");
      navigate("/login");
    }
  });

  return (
    <div className={styles.container}>
      <Header title={`Welcome to the admin panel ${user}`} />
      <div className={styles.adminContainer}>
        <FormFetch />
        <PostEstablishment />
        <div className={styles.adminContainer}>
          <h2 className={styles.adminTitle}>Reserved Accommodations</h2>
          <ReservedFetch />
        </div>
        <div className={styles.adminContainer}>
          <h2 className={styles.adminTitle}>All accommodations</h2>
          <AllPlaces />
        </div>
      </div>
    </div>
  );
}
