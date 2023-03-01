import React from "react";
import styles from "../../App.module.css";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Delete from "./Delete";
import { backend } from "../../utils/api";

export default function ReservedFetch() {
  const [auth] = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchReserved = async () => {
      try {
        const res = await axios.get(backend + "api/places?populate=image", {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });

        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchReserved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.reservedContainer}>
      {data.map((reserved) => {
        if (reserved.attributes.reserved === true) {
          return (
            <div className={styles.reservedCardContainer} key={reserved.id}>
              <img
                src={reserved.attributes.image.data[0].attributes.url}
                alt={
                  reserved.attributes.image.data[0].attributes.alternativeText
                }
                className={styles.reservedCardImage}
              />
              <div className={styles.reservedCardText}>
                <h2 className={styles.header}>{reserved.attributes.name}</h2>
                <p className={styles.reservedName}>
                  Full Name: {reserved.attributes.full_name}
                </p>
                <p className={styles.reservedEmail}>
                  Email: {reserved.attributes.email}
                </p>
                <Delete id={reserved.id} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
