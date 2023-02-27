import axios from "axios";
import { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../../App.module.css";
import AuthContext from "../../context/AuthContext";

export default function FormDelete({ id }) {
  const [auth] = useContext(AuthContext);

  const deleteContactMessage = async () => {
    try {
      await axios.delete("http://localhost:1337/api/forms/" + id, {
        headers: {
          authorization: `Bearer ${auth.jwt}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BsFillTrashFill className={styles.trash} onClick={deleteContactMessage} />
  );
}
