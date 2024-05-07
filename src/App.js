import React, { useState } from 'react';
import { BarcodeScanner, useTorch } from 'react-barcode-scanner'
import "react-barcode-scanner/polyfill"
import './App.css';

function App() {
  const [isSupportTorch, isOpen, onTorchSwitch] = useTorch()
  const [data, setData] = useState("");
  const [format, setFormat] = useState("");

  function dataEng(duration) {
    try {
      window.navigator.vibrate(duration);
    } catch (error) {
      console.log("beep error", error)
    }
  }

  function setBarcode(barcode) {
    console.log("barcode", barcode);
    try {
      setData(barcode.rawValue);
      setFormat(barcode.format);
      dataEng(100);
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '360px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <BarcodeScanner
        options={{
          delay: 100,
          formats: ["qr_code",
            "code_128", "code_39", "code_93",
            "codabar",
            "ean_13", "ean_8",
            "itf",
            "upc_a", "upc_e"]
        }}
        onCapture={(barcode) => { setBarcode(barcode) }}
      />
      {isSupportTorch
        ? <button onClick={onTorchSwitch}>Switch Torch on/off</button>
        : null}
      <div style={{ fontSize: '20px', color: '#000', textAlign: 'left', margin: '20px' }}>Value: {JSON.stringify(data)}</div>
      <div style={{ fontSize: '20px', color: '#000', textAlign: 'left' }}>Format: {JSON.stringify(format)}</div>
    </div>
  );
}

export default App;
