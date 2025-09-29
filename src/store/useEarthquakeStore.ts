import { create } from 'zustand';
import type { EarthquakeData } from '../types/earthquake';

interface EarthquakeStoreState {
  selectedRecords: EarthquakeData[];
  filteredRecords: EarthquakeData[];
  highlightedRecord: EarthquakeData | null;
  addSelectedRecord: (earthquake: EarthquakeData) => void;
  removeSelectedRecord: (id: string) => void;
  setFilteredRecords: (earthquakes: EarthquakeData[]) => void;
  setHighlightedRecord: (earthquake: EarthquakeData | null) => void;
  clearSelectedRecords: () => void;
  isRecordSelected: (id: string) => boolean;
}

export const useEarthquakeStore = create<EarthquakeStoreState>((set, get) => ({
  selectedRecords: [],
  filteredRecords: [],
  highlightedRecord: null,

  addSelectedRecord: (earthquake: EarthquakeData) => {
    const { selectedRecords } = get();
    if (!selectedRecords.find(e => e.id === earthquake.id)) {
      set({ selectedRecords: [...selectedRecords, earthquake] });
    }
  },

  removeSelectedRecord: (id: string) => {
    const { selectedRecords } = get();
    set({ selectedRecords: selectedRecords.filter(e => e.id !== id) });
  },

  setFilteredRecords: (earthquakes: EarthquakeData[]) => {
    set({ filteredRecords: earthquakes });
  },

  setHighlightedRecord: (earthquake: EarthquakeData | null) => {
    set({ highlightedRecord: earthquake });
  },

  clearSelectedRecords: () => {
    set({ selectedRecords: [] });
  },

  isRecordSelected: (id: string) => {
    const { selectedRecords } = get();
    return selectedRecords.some(e => e.id === id);
  },
}));