import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import styles from "../App.module.css";
import { backend } from "../utils/api";

export default function Delete({ id }) {
  const [auth] = useContext(AuthContext);

  const deletePost = async () => {
    try {
      await axios.delete(backend + "api/places/" + id, {
        headers: {
          authorization: `Bearer ${auth.jwt}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={deletePost} className={styles.delete}>
      Delete
    </button>
  );
}
