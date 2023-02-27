import React from "react";
import styles from "../../App.module.css";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

export default function ReservedFetch() {
  const [auth] = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const FetchReserved = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/" + "api/places?populate=image",
          {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );

        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchReserved();
  }, []);

  return (
    <div className={styles.reservedContainer}>
      {data.map((reserved) => {
        // Remove name, email and reserved status from post, opens up for new reservations
        async function removeReserved() {
          try {
            await axios.put(
              "http://localhost:1337/" + "api/places/" + reserved.id,
              {
                data: {
                  full_name: null,
                  email: null,
                  reserved: false,
                },
                headers: {
                  authorization: `Bearer ${auth.jwt}`,
                },
              }
            );
          } catch (error) {
            console.error(error);
          }
        }

        if (reserved.attributes.reserved === true) {
          return (
            <div className={styles.reservedCardContainer} key={reserved.id}>
              <img
                src={
                  "http://localhost:1337" +
                  reserved.attributes.image.data[0].attributes.url
                }
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
                <button className={styles.delete} onClick={removeReserved}>
                  Remove reservation
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
