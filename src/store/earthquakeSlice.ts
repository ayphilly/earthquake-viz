import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import Papa from "papaparse";
import type { EarthquakeData, FilterState } from "../types/earthquake";
import { parseEarthquakeData, applyFilters } from "../utils";
import { EARTHQUAKE_CSV_URL, PAGE_SIZE } from "../utils/constants";
import { initialState } from "./states";

interface PaginatedResult {
  page: number;
  data: EarthquakeData[];
  total: number;
}

export const fetchEarthquakeData = createAsyncThunk<PaginatedResult, number>(
  "earthquake/fetchData",
  async (page: number): Promise<PaginatedResult> => {
    let allEarthquakes: EarthquakeData[] = [];

    const response = await fetch(EARTHQUAKE_CSV_URL);
    const csvText = await response.text();

    const parsed = Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    allEarthquakes = parseEarthquakeData(parsed.data);

    return {
      page,
      data: allEarthquakes,
      total: allEarthquakes.length,
    };
  }
);

const earthquakeSlice = createSlice({
  name: "earthquake",
  initialState,
  reducers: {
    setSelectedEarthquake: (
      state,
      action: PayloadAction<EarthquakeData | null>
    ) => {
      state.selectedEarthquake = action.payload;
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.pageIndex = action.payload;
    },
    setNewEarthquakeData: (state, action: PayloadAction<EarthquakeData[]>) => {
      state.earthquakes = action.payload;
      state.filteredEarthquakes = applyFilters(action.payload, state.filters);
    },
    setChartAxis: (
      state,
      action: PayloadAction<{
        axis: "xAxis" | "yAxis";
        value: keyof EarthquakeData;
      }>
    ) => {
      state.chartConfig[action.payload.axis] = action.payload.value;
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredEarthquakes = applyFilters(
        state.earthquakes,
        state.filters
      );
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarthquakeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEarthquakeData.fulfilled, (state, action) => {
        const start =
          (state.pageIndex > 0 ? state.pageIndex - 1 : 1) * PAGE_SIZE;

        const end = start + PAGE_SIZE;
        const paginatedData = action.payload.data.slice(start, end);

        state.loading = false;
        state.earthquakes = paginatedData;
        state.allEarthquakes = action.payload.data;
        state.filteredEarthquakes = applyFilters(paginatedData, state.filters);
        state.totalItems = action.payload.total;
      })
      .addCase(fetchEarthquakeData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Failed to fetch earthquake data, please try again.";
      });
  },
});

export const {
  setSelectedEarthquake,
  setNewEarthquakeData,
  setPageIndex,
  setChartAxis,
  setFilters,
  clearError,
} = earthquakeSlice.actions;
export default earthquakeSlice.reducer;
