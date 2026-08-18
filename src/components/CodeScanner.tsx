import { Scanner } from "@yudiel/react-qr-scanner";
import { Card } from "./Card";

import styles from "./CodeScanner.module.css";

export function CodeScanner() {
  return (
    <Card>
      <div className={styles.outerContainer}>
        <h1>Scanner</h1>
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
