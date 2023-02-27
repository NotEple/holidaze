import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import useFetch from "../hooks/useFetch";
import AuthContext from "../context/AuthContext";
import Delete from "../components/Delete";

export default function AllHotels() {
  const [auth] = useContext(AuthContext);
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/places?populate=image"
  );

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    );

  if (data === null || data.length === 0) {
    return <div>There are no hotels at the moment, check back later...</div>;
  }

  if (error)
    return (
      <div className={styles.error}>{error} : Something went wrong...</div>
    );

  return (
    <div className={styles.cardsContainer}>
      {data.map((place) => {
        return (
          <div key={place.id} className={styles.reservedCardContainer}>
            <img
              src={
                "http://localhost:1337" +
                place.attributes.image.data[0].attributes.url
              }
              alt={place.id}
              className={styles.reservedCardImage}
            />
            <div className={styles.cardAboutContainer}>
              <div className={styles.cardAboutText}>
                <h3 className={styles.cardTitle}>{place.attributes.name}</h3>
                <p className={styles.cardPrice}>{place.attributes.price},-</p>
              </div>
              <Link
                to={`/places/details/${place.id}`}
                className={styles.submit}>
                Details
              </Link>
              {auth ? (
                <>
                  <Delete id={place.id} />
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
