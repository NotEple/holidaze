import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../App.module.css";
import AuthContext from "../../context/AuthContext";
import { backend } from "../../utils/api";
import FormDelete from "./FormDelete";

export default function FormFetch() {
  const [auth] = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const FetchForms = async () => {
      try {
        const res = await axios.get(backend + "api/forms", {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchForms();
  }, []);

  if (data === null || data.length === 0) {
    return (
      <>
        <div className={styles.formFetchContainer}>
          <h2 className={styles.header}>Form inbox</h2>
          <div>There are no forms at the moment, check back later...</div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.formFetchContainer}>
      <h2 className={styles.header}>Form inbox</h2>
      {data.map((form) => {
        return (
          <div className={styles.formFetchCard} key={form.id}>
            <hr />
            <FormDelete id={form.id} />
            <p className={styles.formFetchTitle}>
              Title: {form.attributes.title}
            </p>
            <p className={styles.formFetchName}>Name: {form.attributes.name}</p>
            <p className={styles.formFetchEmail}>
              Email: {form.attributes.email}
            </p>
            <p className={styles.formFetchSubject}>
              Subject: {form.attributes.subject}
            </p>
          </div>
        );
      })}
    </div>
  );
}
