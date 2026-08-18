# ShoppingSieve

ShoppingSieve is a web application designed to scan food product barcodes and instantly analyze ingredient lists against a user's watchlist of avoided ingredients (such as gluten grains and specific allergens).

**Live**: [shopping-sieve.vercel.app](https://shopping-sieve.vercel.app/) — tracks the current `main` branch.

## Features

- **Barcode Scanning**: Real-time camera scanning for EAN-13, EAN-8, and QR codes.
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

### Linting & Type-Checking

Run before committing:

```bash
npm run check
```

This runs ESLint (JS/TS + React), Stylelint (CSS), and the TypeScript type-checker in sequence. Individually:

```bash
npm run lint       # ESLint
npm run lint:css   # Stylelint
npm run typecheck  # tsc -b
```

### Commit Conventions

Commit messages follow `type(scope): description`. Scope is lowercase, kebab-case if multi-word, and matches the domain (`filter`) or specific file/module (`readme`, `tokens`) touched. Dont specify a scope for project-wide changes.

Types used in this project:

- **`feat`** — a new user-facing capability in the app itself.
- **`fix`** — corrects broken/incorrect behavior.
- **`refactor`** — restructuring (code, markup, or config) with no change to _functional_ behavior. Visual/positional changes are fine as long as what the thing does stays the same (e.g. moving a button without changing what it does).
- **`style`** — a change to what's visibly rendered (CSS or markup) with no new capability and no functional-behavior change.
- **`chore`** — maintenance that isn't user-facing and isn't a structural code change: tooling setup, dependency additions, dead-code/comment removal.
- **`docs`** — documentation-only changes (README, etc.).
