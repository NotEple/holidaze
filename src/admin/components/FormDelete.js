import axios from "axios";
import { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../../App.module.css";
import AuthContext from "../../context/AuthContext";
import { backend } from "../../utils/api";

export default function FormDelete({ id }) {
  const [auth] = useContext(AuthContext);

  const deleteContactMessage = async () => {
    try {
      await axios.delete(backend + "api/forms/" + id, {
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
