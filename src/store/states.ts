import type { AppState, FilterState } from "../types/earthquake";

export const initialFilters: FilterState = {
  minMagnitude: 0,
  maxMagnitude: 10,
  minDepth: 0,
  maxDepth: 1000,
  selectedPlaces: [],
  
};

export const initialState: AppState = {
  earthquakes: [],
  filteredEarthquakes: [],
  selectedEarthquake: null,
  loading: false,
  error: null,
  filters: initialFilters,
  chartConfig: {
    xAxis: "mag",
    yAxis: "depth",
  },
  pageIndex:1,
  totalItems:0,
  allEarthquakes:[]
};