import React, { useContext, useRef, useState } from "react";
import styles from "../../App.module.css";
import AuthContext from "../../context/AuthContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function PostEstablishment(props) {
  const [auth] = useContext(AuthContext);
  const fileRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [submit, setSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      about: "",
      price: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(13, "Max 13 characters")
        .required("Please provide a name"),
      about: Yup.string().required("Please provide a description"),
      price: Yup.number().required("Please provide a price"),
      image: Yup.mixed()
        .required("Please a image")
        .test(
          "fileSize",
          "File size is to large(Max 200kb)",
          (value) => value.size <= 200000
        ),
    }),

    onSubmit: async (values) => {
      setSubmit(true);

      const formInfo = {
        name: values.name,
        about: values.about,
        price: values.price,
      };

      try {
        const data = new FormData();
        data.append("files.image", values.image);
        data.append("data", JSON.stringify(formInfo));

        const req = await fetch("http://localhost:1337/api/places", {
          method: "POST",
          headers: {
            authorization: `Bearer ${auth.jwt}`,
          },
          body: data,
        });
        if (req.status === 200) {
          setSent(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmit(false);
      }
    },
  });

  const onFileChange = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2 className={styles.header}>New accommodation</h2>
      <fieldset className={styles.formFieldset}>
        <input
          type="file"
          name="image"
          onChange={onFileChange}
          ref={fileRef}
          className={styles.file}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className={styles.formError}>{formik.errors.image}</div>
        ) : null}
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.formError}>{formik.errors.name}</div>
        ) : null}
        <label className={styles.label}>About</label>
        <input
          className={styles.input}
          type="text"
          name="about"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.about}
        />
        {formik.touched.about && formik.errors.about ? (
          <div className={styles.formError}>{formik.errors.about}</div>
        ) : null}
        <label className={styles.label}>Price</label>
        <input
          className={styles.input}
          type="number"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div className={styles.formError}>{formik.errors.price}</div>
        ) : null}
        <button type="submit" className={styles.submit}>
          {submit ? (
            <div className={styles.submitLoading}></div>
          ) : (
            "Add new accommodation"
          )}
        </button>
      </fieldset>
      {sent ? (
        <div className={styles.formSuccess}>
          <p>Success!</p>
          <BsFillCheckCircleFill className={styles.formSuccessIcon} />
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
