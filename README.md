# Origin Savings App

An application that helps users plan savings and manage personal financial goals.

## Installation

### System Requirements
- Node.js (version 20.x or higher)

### Installation Steps

1. Clone the repository
```bash
git clone <repository-url>
cd origin-savings-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development environment
```bash
npm run dev
# or
yarn dev
```

The application will run at [http://localhost:3000](http://localhost:3000)


## Project Structure

```
origin-savings-app/
├── public/              # Static resources
├── src/                 # Source code
│   ├── assets/          # Images, fonts, and other resources
│   ├── components/      # Reusable React components
│   ├── contexts/        # React contexts and providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # User interface pages
│   ├── services/        # API handling logic and services
│   ├── utils/           # Utilities and helper functions
│   ├── App.js           # Root application component
│   └── index.js         # Application entry point
├── .gitignore           # List of files ignored by git
├── package.json         # Dependencies and scripts declaration
└── README.md            # Project introduction file
```

## Testing

### Running unit tests
```bash
npm run test
# or
yarn test
```

### Check test coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

## Production Build

```bash
npm run build
# or
yarn build
```

Static files will be generated in the `build/` directory.