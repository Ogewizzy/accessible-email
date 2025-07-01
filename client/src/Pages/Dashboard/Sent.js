
import React, { useEffect, useState } from "react";
import { getSentEmails } from "../../services/api";
import styles from "./Sent.module.css"; // ✅ Correct module import

const Sent = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const res = await getSentEmails();
        if (Array.isArray(res.data)) {
          setEmails(res.data);
        } else {
          console.error("Sent response is not an array:", res.data);
          setEmails([]);
        }
      } catch (error) {
        console.error("Error fetching sent emails:", error);
      }
    };

    fetchSentEmails();
  }, []);

  return (
    <div className={styles.emailContainer}>
      <h2>Sent Emails</h2>
      {emails.length === 0 ? (
        <p className={styles.noEmail}>No sent email yet.</p>
      ) : (
        <table className={styles.emailTable}>
          <thead>
            <tr>
              <th>To</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email._id}>
                <td>{email.receiver}</td>
                <td>{email.subject}</td>
                <td>{email.message}</td>
                <td>{new Date(email.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Sent;