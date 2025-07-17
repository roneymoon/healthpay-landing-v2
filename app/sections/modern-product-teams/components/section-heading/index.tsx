import { type FC } from "react";
import styles from "./styles.module.css";

const SectionHeading: FC = () => {
  return (
    <div className={styles.top__container}>
      <div className={styles.heading}>
        <h2>
          <span className={styles.line1}>Built for</span>
          <span className={styles.line2}>modern healthcare</span>
          <span className={styles.line3}>providers</span>
        </h2>
      </div>

      <div className={styles.description}>
        <p>
          HealthPay is designed around the needs of efficient healthcare teams—
          ensuring claim accuracy, streamlining insurance processes, and
          accelerating revenue cycles with precision and automation.
        </p>
      </div>
    </div>
  );
};

export default SectionHeading;
