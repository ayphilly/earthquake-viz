export interface EarthquakeData {
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  magType: string;
  nst: number;
  gap: number;
  dmin: number;
  rms: number;
  net: string;
  id: string;
  updated: string;
  place: string;
  type: string;
  horizontalError: number;
  depthError: number;
  magError: number;
  magNst: number;
  status: string;
  locationSource: string;
  magSource: string;
}

export interface ChartAxisOption {
  key: keyof EarthquakeData;
  label: string;
  type: 'numeric' | 'string';
}

export interface FilterState {
  minMagnitude: number;
  maxMagnitude: number;
  minDepth: number;
  maxDepth: number;
  selectedPlaces: string[];
}

export interface AppState {
  earthquakes: EarthquakeData[];
  allEarthquakes: EarthquakeData[];
  filteredEarthquakes: EarthquakeData[];
  selectedEarthquake: EarthquakeData | null;
  loading: boolean;
  error: string | null;
  filters: FilterState;
  chartConfig: {
    xAxis: keyof EarthquakeData;
    yAxis: keyof EarthquakeData;
  };
  pageIndex: number;
  totalItems:number;
}