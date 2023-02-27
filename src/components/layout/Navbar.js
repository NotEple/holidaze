import { Turn as Hamburger } from "hamburger-react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../../App.module.css";
import Logo from "../../images/Logo.png";
import AuthContext from "../../context/AuthContext";

export default function Navbar() {
  const [auth, setAuth] = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    setOpen(false);
    localStorage.clear("loggedInUser");
    navigate("/login");
  }

  if (auth) {
    setTimeout(() => {
      localStorage.clear("loggedInUser");
    }, 300000);
  }

  const closeOnClick = () => {
    setOpen(false);
  };

  let menu;

  if (isOpen) {
    menu = (
      <div className={styles.menu}>
        <ul className={styles.linkContainerCpen}>
          <NavLink
            to="/"
            className={styles.linkOpen}
            activeclassname={styles.activeOpen}
            onClick={closeOnClick}>
            Home
          </NavLink>
          <NavLink
            to="/places"
            className={styles.linkOpen}
            activeclassname={styles.activeOpen}
            onClick={closeOnClick}>
            Places
          </NavLink>
          <NavLink
            to="/contact"
            className={styles.linkOpen}
            activeclassname={styles.activeOpen}
            onClick={closeOnClick}>
            Contact
          </NavLink>
          <div className={styles.btnContainerOpen}>
            {auth ? (
              <>
                <NavLink
                  to="/adminpanel"
                  className={styles.linkOpen}
                  activeclassname={styles.activeOpen}
                  onClick={closeOnClick}>
                  Admin Panel
                </NavLink>
                <div onClick={logout} className={styles.btnLinkOpen}>
                  Logout
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className={styles.btnLinkOpen}
                onClick={closeOnClick}>
                Login
              </Link>
            )}
          </div>
        </ul>
      </div>
    );
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={Logo} className={styles.logo} alt="Holidaze" />
          </Link>
        </div>
        <div className={styles.bars}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <ul className={styles.linkContainer}>
          <NavLink
            to="/"
            className={styles.link}
            activeclassname={styles.active}>
            Home
          </NavLink>
          <NavLink
            to="/places"
            className={styles.link}
            activeclassname={styles.active}>
            Places
          </NavLink>
          <NavLink
            to="/contact"
            className={styles.link}
            activeclassname={styles.active}>
            Contact
          </NavLink>
          <div className={styles.btnContainer}>
            {auth ? (
              <>
                <NavLink
                  to="/adminpanel"
                  className={styles.link}
                  activeclassname={styles.active}>
                  Admin Panel
                </NavLink>
                <div onClick={logout} className={styles.btnLink}>
                  Logout
                </div>
              </>
            ) : (
              <Link to="/login" className={styles.btnLink}>
                Login
              </Link>
            )}
          </div>
        </ul>
      </nav>
      {menu}
    </>
  );
}
