import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCheckCircleFill } from "react-icons/bs";
import * as yup from "yup";
import styles from "../App.module.css";
import { backend } from "../utils/api";

const schema = yup.object().shape({
  title: yup.string().required("Enter a title"),
  full_name: yup.string().required("Enter your full name"),
  email: yup.string().email().required("Enter your email"),
  subject: yup
    .string()
    .min(10, "Min 10 characters")
    .required("Enter detailed info of your reason to contact us"),
});

export default function ContactForm() {
  const [submit, setSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function sendForm(data) {
    setSubmit(true);
    setSubmitError(null);

    try {
      const send = await axios.post(backend + "api/forms", {
        data: {
          title: data.title,
          full_name: data.full_name,
          email: data.email,
          subject: data.subject,
        },
      });
      if (send.status === 200) {
        setSent(true);
      } else {
        setSent(false);
      }
    } catch (error) {
      setSubmitError(error.toString());
    } finally {
      setSubmit(false);
    }
  }

  function refreshPage() {
    setTimeout(function () {
      window.location.reload();
    }, 3500);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(sendForm)}>
      {submitError && <div className={styles.error}>Something went wrong</div>}
      <fieldset className={styles.formFieldset} disabled={submit}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Title..."
          {...register("title")}
        />
        {errors.title && (
          <span className={styles.formError}>{errors.title.message}</span>
        )}
        <label className={styles.label}>Full Name</label>
        <input
          className={styles.input}
          type="text"
          name="full_name"
          placeholder="Full name..."
          {...register("full_name")}
        />
        {errors.name && (
          <span className={styles.formError}>{errors.name.message}</span>
        )}
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="text"
          name="email"
          placeholder="Email..."
          {...register("email")}
        />
        {errors.email && (
          <span className={styles.formError}>{errors.email.message}</span>
        )}
        <label className={styles.label}>Subject</label>
        <textarea
          className={styles.textareaInput}
          type="text"
          name="subject"
          placeholder="Subject..."
          {...register("subject")}
        />
        {errors.subject && (
          <span className={styles.formError}>{errors.subject.message}</span>
        )}
      </fieldset>
      {sent ? (
        <div className={styles.formSuccess} onSubmit={refreshPage()}>
          <p>Form Sent</p>
          <BsFillCheckCircleFill className={styles.formSuccessIcon} />
        </div>
      ) : (
        ""
      )}
      <button className={styles.submit}>
        {submit ? <div className={styles.submitLoading}></div> : "Send"}
      </button>
    </form>
  );
}
