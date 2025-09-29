# Earthquake Data Visualization

A modern, interactive single-page web application built with React and TypeScript that fetches real-time earthquake data from the USGS 
and presents it using both visual charts and data tables.

# Features

# Data Visualization
- Interactive Scatter Plot: Built using Recharts, allows users to select which numeric variables to display on X and Y axes
- Real-time Data: Fetches live earthquake data from USGS CSV feed
- Responsive Design: Optimized two-panel layout for desktop/laptop screens


### Data Management
- TanStack Table: Professional data table with pagination, sorting, and filtering
- Comprehensive CSV Display: Showing all columns from the earthquake CSV data
- Pagination: Efficiently handles large datasets with configurable page sizes
- Multiple State Management Patterns:
  - Props Pattern: Data and event handlers passed via props between components
  - React Context: Manages currently selected earthquake entry across components
  - Zustand Store: Global state for managing selected/filtered records

## Interactive Features
- Cross-component Communication: Selecting points in chart highlights rows in table and vice versa
- Multi-selection: Select multiple earthquake records using checkboxes with TanStack Table
- Advanced Filtering: Global search across all columns plus individual column sorting
- Pagination Controls: Navigate through large datasets with customizable page sizes
- Row Selection: Built-in row selection with select all functionality
- Detailed View: Click any earthquake to see detailed information

### Technical Highlights
- TypeScript: Fully typed with strict typing (no `any` usage)
- GSAP Animations: Smooth micro-animations for enhanced UX
- Custom Design System: Tailwind CSS with custom color palette
- Modern Font: Google Fonts Outfit family
- State Synchronization: Seamless data flow between chart and table components

## Quick Start

### Prerequisites
- Node.js (v22.12.0 or higher recommended)
- npm package manager

### Installation

1. Clone the repository
   ```bash
   git clone `https://github.com/ayphilly/earthquake-viz`
   cd earthquake-viz
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser
   Navigate to `http://localhost:5173` to view the application



### Scripts

- Start dev server
```bash
  npm run dev
```

- Build for production
```bash
  npm run build
```

- Preview production build
```bash
  npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── inputs/          # Houses Buttons, Inputs e.t.c
│   ├── ChartPanel.tsx   # Interactive scatter plot with axis controls
│   ├── SelectedQuake.tsx   # Component that displays selected Row
│   ├── DataTable.tsx    # TanStack Table with pagination and sorting
│   └── Loader.tsx       # Animated loading component
├── containers/          # view/page containers
│   ├── ViewContent.tsx  # handles the main app content
├── context/             # React Context providers
│   └── EarthquakeContext.tsx # Handles Selected earthquake context
├── hooks/               # Custom React hooks
│   └── redux.ts         # App Redux hooks
├── store/               # App State management
│   ├── index.ts         # App Redux store configuration
│   ├── earthquakeSlice.ts # App Redux toolkit slice
│   └── useEarthquakeStore.ts # App Zustand store
├── types/               # Houses Data types and interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

### Color Palette

- Main Colors: Blue spectrum from `#E5EFFF` to `#030407`
- Secondary Colors: Purple spectrum from `#F8F9FF` to `#181E34`
- Background: Light gray `#F9FAFB`
- Dark Text: Deep blue-black `#080A12`

### Typography
- Font Family: Outfit (Google Fonts)
- `https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap`

### Core Technologies
- React 19.1.1
- TypeScript 5.8.3
- Vite 7.1.7

### State Management
- Redux Toolkit 2.0.1
- React Redux 9.0.4
- Zustand 4.4.7

### UI & Styling
- CSS
- Tailwind CSS 3.4.0
- Recharts 2.8.0
- TanStack Table 8.11.3
- GSAP 3.12.2



## Data Source

The application fetches data from the USGS Earthquake Hazards Program:
- CSV file: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv`
- Data contains all earthquakes from the past month worldwide


### State Management Patterns

### 1. Props Pattern
- Parent-to-child data flow
- Use case: Chart and table components receive data via props

### 2. React Context
- Currently selected earthquake state
- Use case: `EarthquakeContext` provides selected earthquake across components


### 3. Zustand Store
- Global selections and filtering
- Use Case: `useEarthquakeStore` manages multi-selected records