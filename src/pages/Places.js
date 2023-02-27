import styles from "../App.module.css";
import AllPlaces from "../components/AllPlaces";
import Header from "../components/layout/Header";

export default function Places() {
  return (
    <div className={styles.container}>
      <Header title="All places" />
      <div className={styles.placesWrapper}>
        <AllPlaces />
      </div>
    </div>
  );
}
