import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import styles from "../App.module.css";
import { jwt } from "../utils/api";
import AuthContext from "../context/AuthContext";

const url = "http://localhost:1337/" + jwt;

const schema = yup.object().shape({
  username: yup.string().required("Enter your username"),
  password: yup.string().required("Enter your password"),
});

export default function LoginForm() {
  const [submit, setSubmit] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmit(true);
    setLoginError(null);
    try {
      const response = await axios.post(url, {
        identifier: data.username,
        password: data.password,
      });
      setAuth(response.data);
      localStorage.setItem("loggedInUser", data.username);
      navigate("/adminpanel");
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmit(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {loginError && (
        <div className={styles.formError}>Wrong username or password</div>
      )}
      <fieldset className={styles.formFieldset} disabled={submit}>
        <label className={styles.label}>Username</label>
        <input
          className={styles.input}
          name="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <span className={styles.formError}>{errors.username.message}</span>
        )}
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          name="password"
          placeholder="Password"
          {...register("password")}
          type="password"
        />
        {errors.password && (
          <span className={styles.formError}>{errors.password.message}</span>
        )}
        <button className={styles.submit}>
          {submit ? <div className={styles.loginLoading}></div> : "Login"}
        </button>
      </fieldset>
    </form>
  );
}
