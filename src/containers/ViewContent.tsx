import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchEarthquakeData } from "../store/earthquakeSlice";
import ChartPanel from "../components/ChartPanel";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";
import { SelectedQuake } from "../components/SelectedQuake";

export const ViewContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pageIndex } = useAppSelector((state) => state.earthquake);
  const { loading, error } = useAppSelector((state) => state.earthquake);

  useEffect(() => {
    dispatch(fetchEarthquakeData(pageIndex));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-main-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl font-bold mb-2">
            Error Loading Data
          </div>
          <div className="text-sec-600">{error}</div>
          <button
            onClick={() => dispatch(fetchEarthquakeData(1))}
            className="mt-4 px-4 py-2 bg-main-500 text-white rounded-lg hover:bg-main-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-bg p-6">
      <div className="max-w-full px-[1em] md:px-[2em] 2xl:px-[5em] mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-main-902 mb-2">
            Earthquake Data Visualization
          </h1>
          <p className="text-sec-800 font-[300]">
            Interactive visualization of global earthquake data from USGS
          </p>
        </header>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          <div className="h-full relative order-1 lg:order-1">
            <div className="sticky top-4  flex flex-col gap-[1.5em] ">
              <SelectedQuake />
              <ChartPanel />
            </div>
          </div>
          <div className="order-2 lg:order-2">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};
