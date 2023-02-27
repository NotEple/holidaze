import styles from "../../App.module.css";

export default function Header({ title }) {
  return <h1 className={styles.header}>{title}</h1>;
}
