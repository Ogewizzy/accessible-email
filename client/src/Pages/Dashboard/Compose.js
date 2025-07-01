
import React, { useState } from "react";
import { sendEmail } from "../../services/api";
import styles from "./Compose.module.css";

const Compose = () => {
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendEmail({ receiver, subject, message });
      alert("Email sent successfully");
      setReceiver("");
      setSubject("");
      setMessage("");
    } catch (error) {
      alert("Failed to send email");
    }
  };

  return (
    <div className={styles.composeContainer}>
      <h2 className={styles.title}>Compose Email</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Receiver"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button}>Send</button>
      </form>
    </div>
  );
};

export default Compose;