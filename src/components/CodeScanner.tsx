import { Scanner } from "@yudiel/react-qr-scanner";
import { Card } from "./Card";

import styles from "./CodeScanner.module.css";

export function CodeScanner() {
  return (
    <Card>
      <div className={styles.outerContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Scanner</h1>
          <p className={styles.subtitle}>Scan a food product barcode</p>
        </div>
        {
          <Scanner
            classNames={{
              container: styles.scannerContainer,
              video: styles.video,
            }}
            onScan={(result) => console.log(result)}
            onError={(error) => console.log(error?.message)}
            components={{
              finder: false,
            }}
          />
        }
      </div>
    </Card>
  );
}
