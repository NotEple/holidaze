import React from "react";
import styles from "../App.module.css";
import LoginForm from "../components/LoginForm";
import Header from "../components/layout/Header";

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <Header title="Login" />
        <LoginForm />
      </div>
    </>
  );
}
