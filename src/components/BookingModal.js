import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import styles from "../App.module.css";
import { backend } from "../utils/api.js";

const schema = yup.object().shape({
  full_name: yup
    .string()
    .min(5, "Enter a minimun of 5 ")
    .required("Enter your full name"),
  email: yup.string().email().required("Enter your email"),
});

export default function BookingModal({ modalClosed }) {
  const { id } = useParams();
  const [sent, setSent] = useState(false);
  const [submit, setSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function book(data) {
    setSubmit(true);
    try {
      const book = await axios.put(backend + "api/places/" + id, {
        data: {
          full_name: data.full_name,
          email: data.email,
          reserved: true,
        },
      });
      if (book.status === 200) {
        setSent(true);
      }
      if (book.status === 400) {
        setSent(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  }

  return (
    <div className={styles.modalContainer}>
      <form className={styles.modalForm} onSubmit={handleSubmit(book)}>
        <AiFillCloseCircle
          className={styles.closeIcon}
          onClick={() => modalClosed(false)}
        />
        <label className={styles.label}>Full name</label>
        <input
          className={styles.input}
          type="text"
          full_name="full_name"
          {...register("full_name")}
        />
        {errors.name && (
          <span className={styles.formError}>{errors.name.message}</span>
        )}
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          {...register("email")}
        />
        {errors.email && (
          <span className={styles.formError}>{errors.email.message}</span>
        )}
        <p className={styles.modalAreyousure}>
          Are you sure you want to book this accommodation? If you regret the
          reservation, send us a message using the contact form.
        </p>
        {sent ? (
          <div className={styles.modalBookingSuccess}>
            <p>Reservation is recived</p>
            <BsFillCheckCircleFill className={styles.formSuccessIcon} />
          </div>
        ) : null}
        <button className={styles.detailsBtn}>
          {submit ? (
            <div className={styles.submitLoading}></div>
          ) : (
            "Book accommodation"
          )}
        </button>
        <button className={styles.cancelBtn} onClick={() => modalClosed(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
