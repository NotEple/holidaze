import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import useFetch from "../hooks/useFetch";
import AuthContext from "../context/AuthContext";
import { local } from "../utils/api";

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
        const deletePost = async () => {
          try {
            await axios.delete(local + "api/places/" + place.id, {
              headers: {
                authorization: `Bearer ${auth.jwt}`,
              },
            });
          } catch (error) {
            console.log(error);
          }
        };

        if (place.attributes.reserved === true) {
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
                    <button className={styles.delete} onClick={deletePost}>
                      Delete
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          );
        }
        if (place.attributes.reserved === false) {
          return (
            <div key={place.id} className={styles.cardContainer}>
              <img
                src={
                  "http://localhost:1337" +
                  place.attributes.image.data[0].attributes.url
                }
                alt={place.id}
                className={styles.cardImage}
              />
              <div className={styles.cardAboutContainer}>
                <div className={styles.cardAboutText}>
                  <h2 className={styles.cardTitle}>{place.attributes.name}</h2>
                  <p className={styles.cardPrice}>{place.attributes.price},-</p>
                </div>
                <Link
                  to={`/places/details/${place.id}`}
                  className={styles.submit}>
                  Details
                </Link>
                {auth ? (
                  <>
                    <button className={styles.delete} onClick={deletePost}>
                      Delete
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
