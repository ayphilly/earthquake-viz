import type { EarthquakeData, FilterState } from "../types/earthquake";

export const parseEarthquakeData = (
  rows: Record<string, string>[]
): EarthquakeData[] => {
  return rows
    .filter((row) => row.time && row.latitude && row.longitude)
    .map((row) => ({
      time: row.time,
      latitude: parseFloat(row.latitude) || 0,
      longitude: parseFloat(row.longitude) || 0,
      depth: parseFloat(row.depth) || 0,
      mag: parseFloat(row.mag) || 0,
      magType: row.magType || "",
      nst: parseInt(row.nst) || 0,
      gap: parseFloat(row.gap) || 0,
      dmin: parseFloat(row.dmin) || 0,
      rms: parseFloat(row.rms) || 0,
      net: row.net || "",
      id: row.id || "",
      updated: row.updated || "",
      place: row.place || "",
      type: row.type || "",
      horizontalError: parseFloat(row.horizontalError) || 0,
      depthError: parseFloat(row.depthError) || 0,
      magError: parseFloat(row.magError) || 0,
      magNst: parseInt(row.magNst) || 0,
      status: row.status || "",
      locationSource: row.locationSource || "",
      magSource: row.magSource || "",
    }));
};

export const applyFilters = (
  earthquakes: EarthquakeData[],
  filters: FilterState
): EarthquakeData[] => {
  return earthquakes.filter((earthquake) => {
    return (
      earthquake.mag >= filters.minMagnitude &&
      earthquake.mag <= filters.maxMagnitude &&
      earthquake.depth >= filters.minDepth &&
      earthquake.depth <= filters.maxDepth &&
      (filters.selectedPlaces.length === 0 ||
        filters.selectedPlaces.some((place) =>
          earthquake.place.toLowerCase().includes(place.toLowerCase())
        ))
    );
  });
};

export const getMagnitudeStyle = (mag: number): string => {
  if (mag >= 6) {
    return "bg-red-100 text-red-800";
  }
  if (mag >= 4) {
    return "bg-orange-100 text-orange-800";
  }
  return "bg-green-100 text-green-800";
};
