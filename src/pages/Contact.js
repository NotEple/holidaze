import styles from "../App.module.css";
import ContactForm from "../components/ContactForm";
import Header from "../components/layout/Header";

export default function Contact() {
  return (
    <>
      <div className={styles.container}>
        <Header title="Contact" />
        <ContactForm />
      </div>
    </>
  );
}
