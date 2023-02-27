import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "../../App.module.css";

export default function Footer() {
  const iconStyle = { color: "white", fontSize: "1.5rem" };

  return (
    <footer className={styles.footer}>
      <ul className={styles.socialContainer}>
        <li className={styles.social}>
          <button className={styles.twitter}>
            <FaTwitter style={iconStyle} />
          </button>
        </li>
        <li className={styles.social}>
          <button className={styles.facebook}>
            <FaFacebookF style={iconStyle} />
          </button>
        </li>
        <li className={styles.social}>
          <button className={styles.instagram}>
            <FaInstagram style={iconStyle} />
          </button>
        </li>
      </ul>
      <ul className={styles.legalContainer}>
        <li className={styles.legal}>
          <a href={"/legal"}>Legal</a>
        </li>
        <li className={styles.legal}>
          <a href={"/legal"}>Terms of Service</a>
        </li>
        <li className={styles.legal}>
          <a href={"/legal"}>Privacy Policy</a>
        </li>
      </ul>
    </footer>
  );
}
