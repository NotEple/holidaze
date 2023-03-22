import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../App.module.css";
import useFetch from "../hooks/useFetch";
import BookingModal from "../components/BookingModal";
import { backend } from "../utils/api";

export default function Details() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { loading, error, data } = useFetch(
    backend + "api/places/" + id + "?populate=image"
  );

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    );

  if (error)
    return (
      <div className={styles.error}>{error} : Something went wrong...</div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <img
          src={data.attributes.image.data[0].attributes.url}
          alt={data.attributes.image.data[0].alternativeText}
          className={styles.detailsImage}
        />
        <h2 className={styles.subHeader}>{data.attributes.name}</h2>
        <div className={styles.aboutText}>
          <p className={styles.about}>{data.attributes.about}</p>
          <p className={styles.price}>{data.attributes.price},-</p>
        </div>
      </div>
      <div className={styles.detailsBookingContainer}>
        <h3>Do you wish to book this accommodation?</h3>
        <button
          className={styles.detailsBtn}
          onClick={() => setModalOpen(true)}>
          Book accommodation
        </button>
        {modalOpen && <BookingModal modalClosed={setModalOpen} />}
      </div>
    </div>
  );
}
