import React, { createContext, useContext, type ReactNode } from 'react';
import type { EarthquakeData } from '../types/earthquake';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setSelectedEarthquake } from '../store/earthquakeSlice';

interface EarthquakeContextType {
  selectedEarthquake: EarthquakeData | null;
  selectEarthquake: (earthquake: EarthquakeData | null) => void;
}

const EarthquakeContext = createContext<EarthquakeContextType | undefined>(undefined);

export const useEarthquakeContext = (): EarthquakeContextType => {
  const context = useContext(EarthquakeContext);
  if (context === undefined) {
    throw new Error('useEarthquakeContext must always be used within an EarthquakeProvider');
  }
  return context;
};

interface EarthquakeProviderProps {
  children: ReactNode;
}

export const EarthquakeProvider: React.FC<EarthquakeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const selectedEarthquake = useAppSelector(state => state.earthquake.selectedEarthquake);

  const selectEarthquake = (earthquake: EarthquakeData | null) => {
    dispatch(setSelectedEarthquake(earthquake));
  };

  return (
    <EarthquakeContext.Provider value={{ selectedEarthquake, selectEarthquake }}>
      {children}
    </EarthquakeContext.Provider>
  );
};

