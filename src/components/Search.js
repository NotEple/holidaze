import React from "react";
import axios from "axios";
import Select from "react-select";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { local } from "../utils/api";

export default function Search() {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    const getPlace = async () => {
      const res = await axios.get(local + "api/places?populate=image");
      setPlace(res.data.data);
    };
    getPlace();
  }, []);

  const options = place.map((place) => {
    return {
      value: place.attributes.title,
      label: (
        <Link to={`/places/details/${place.id}`} className={styles.searchLink}>
          <img
            src={
              "http://localhost:1337" +
              place.attributes.image.data[0].attributes.url
            }
            alt={place.attributes.image.data[0].attributes.alternativeText}
            className={styles.searchImage}
          />
          <h3>{place.attributes.name}</h3>
        </Link>
      ),
    };
  });
  return (
    <Select
      options={options}
      placeholder={"Search for a place..."}
      className={styles.search}
    />
  );
}
