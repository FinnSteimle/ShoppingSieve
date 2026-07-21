# ShoppingSieve

ShoppingSieve is a web application designed to scan food product barcodes and instantly analyze ingredient lists against a user's watchlist of avoided ingredients (such as gluten grains and specific allergens).

## Features

- **Barcode Scanning**: Real-time camera scanning for EAN-13, EAN-8, and QR codes.
- **Flashlight Control**: Integrated camera flash toggle for low-light environments on supported mobile hardware.
- **OpenFoodFacts Integration**: Automated product lookups using the OpenFoodFacts REST API.
- **Safety Status**: Color-coded overlay providing immediate feedback on whether a scanned product contains flagged ingredients.
- **Customizable Watchlist**: Interactive ingredient filter pills allowing users to toggle active watchlist items dynamically.

## Tech Stack

- **Frontend Framework**: React 19, TypeScript, Vite
- **Barcode Engine**: `@yudiel/react-qr-scanner`
- **Data Source**: OpenFoodFacts API
- **Deployment Platform**: Vercel

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Setup and Build

1. Clone the repository:
   ```bash
   git clone https://github.com/FinnSteimle/ShoppingSieve.git
   cd ShoppingSieve
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

