import { useState } from 'react'
import './App.css'
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner'

function App() {
  const [detectedBarcode, setDetectedBarcode] = useState<IDetectedBarcode | null>(null);

  function handleScan(detectedCodes: IDetectedBarcode[]) {
      console.log('Detected codes:', detectedCodes);
      // detectedCodes is an array of IDetectedBarcode objects
      detectedCodes.forEach(code => {
        console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
      });

    if (detectedCodes.length != 1) {
        throw Error("Can't handle multiple codes!")
      }

    setDetectedBarcode(detectedCodes[0]);
  };

  return (
    <>
      <Scanner
            onScan={result => handleScan(result)}
            onError={(error) => console.log(error?.message)}
      />
      <p>Current code: {detectedBarcode ? detectedBarcode.rawValue : "No barcode detected"}</p>
    </>
  )
}

export default App
