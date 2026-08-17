import { Scanner } from '@yudiel/react-qr-scanner';

import styles from './CodeScanner.module.css';

export function CodeScanner() {
  return (
    <>
      <h1>Scanner</h1>
      {<Scanner
        classNames={{ container: styles.container, video: styles.video }}
        onScan={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
        components={{
          finder: false,
        }}
      />}
    </>
  )
}
