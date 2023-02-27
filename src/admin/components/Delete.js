import React, { useContext } from "react";
import axios from "axios";
import styles from "../../App.module.css";
import AuthContext from "../../context/AuthContext";

export default function Delete({ id }) {
  const [auth] = useContext(AuthContext);

  async function removeReserved() {
    try {
      await axios.put("http://localhost:1337/api/places/" + id, {
        data: {
          full_name: null,
          email: null,
          reserved: false,
        },
        headers: {
          authorization: `Bearer ${auth.jwt}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={removeReserved} className={styles.delete}>
      Remove Reservation
    </button>
  );
}
