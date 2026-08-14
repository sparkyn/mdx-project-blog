import React from "react";

import styles from "./not-found.module.css";

export const metadata = {
  title: `404 Not found • Bits &amp; Bytes`,
};

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>

      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}

export default NotFound;
