
import React, { useEffect, useState } from "react";
import { getInboxEmails } from "../../services/api";
import styles from "./Inbox.module.css"; // ✅ Correct module import

const Inbox = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchInboxEmails = async () => {
      try {
        const res = await getInboxEmails();
        if (Array.isArray(res.data)) {
          setEmails(res.data);
        } else {
          console.error("Inbox response is not an array:", res.data);
          setEmails([]);
        }
      } catch (error) {
        console.error("Error fetching inbox emails:", error);
      }
    };

    fetchInboxEmails();
  }, []);

  return (
    <div className={styles.emailContainer}>
      <h2>Inbox</h2>
      {emails.length === 0 ? (
        <p className={styles.noEmail}>No inbox email yet.</p>
      ) : (
        <table className={styles.emailTable}>
          <thead>
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email._id}>
                <td>{email.sender}</td>
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

export default Inbox;