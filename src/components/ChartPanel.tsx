import React, { useEffect, useRef } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { gsap } from "gsap";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useEarthquakeStore } from "../store/useEarthquakeStore";
import { setChartAxis } from "../store/earthquakeSlice";
import type { EarthquakeData, ChartAxisOption } from "../types/earthquake";
import moment from "moment";

const chartAxisOptions: ChartAxisOption[] = [
  { key: "mag", label: "Magnitude", type: "numeric" },
  { key: "depth", label: "Depth (km)", type: "numeric" },
  { key: "latitude", label: "Latitude", type: "numeric" },
  { key: "longitude", label: "Longitude", type: "numeric" },
  { key: "gap", label: "Gap", type: "numeric" },
  { key: "rms", label: "RMS", type: "numeric" },
  { key: "nst", label: "Number of Stations", type: "numeric" },
];

const ChartPanel: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { filteredEarthquakes, chartConfig } = useAppSelector(
    (state) => state.earthquake
  );
  const { selectEarthquake } = useEarthquakeContext();
  const { setHighlightedRecord, highlightedRecord } = useEarthquakeStore();

  console.log(highlightedRecord);
  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleAxisChange = (axis: "xAxis" | "yAxis", value: string) => {
    dispatch(setChartAxis({ axis, value: value as keyof EarthquakeData }));
  };

  const handleDotClick = (data: EarthquakeData) => {
    selectEarthquake(data);
    setHighlightedRecord(data);
  };

  const handleDotHover = (data: EarthquakeData | null) => {
    setHighlightedRecord(data);
  };

  const formatChartData = () => {
    return filteredEarthquakes.map((earthquake) => ({
      ...earthquake,
      x: earthquake[chartConfig.xAxis],
      y: earthquake[chartConfig.yAxis],
    }));
  };

  return (
    <div
      ref={chartRef}
      className="h-fit  bg-white rounded-xl shadow-sm border border-sec-200 p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-main-902 mb-4">
          Earthquake Visualization
        </h2>

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-sec-700 mb-2">
              X-Axis
            </label>
            <select
              value={chartConfig.xAxis}
              onChange={(e) => handleAxisChange("xAxis", e.target.value)}
              className="px-3 py-2 border border-sec-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500"
            >
              {chartAxisOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-sec-700 mb-2">
              Y-Axis
            </label>
            <select
              value={chartConfig.yAxis}
              onChange={(e) => handleAxisChange("yAxis", e.target.value)}
              className="px-3 py-2 border border-sec-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-500"
            >
              {chartAxisOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={formatChartData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#B7D3FF" />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fontSize: 12, fill: "#505D91" }}
            />
            <YAxis
              dataKey="y"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fontSize: 12, fill: "#505D91" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              data={formatChartData()}
              fill="#2E7FFF"
              shape={<CustomScatterShape />}
              onClick={(data) => handleDotClick(data)}
              onMouseEnter={(data) => handleDotHover(data)}
              onMouseLeave={() => handleDotHover(null)}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-sec-600">
        Total data points: {filteredEarthquakes.length}
      </div>
    </div>
  );
};

export default ChartPanel;

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: EarthquakeData }[];
}) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-sec-300 rounded-lg shadow-lg">
        <p className="font-semibold text-main-902">{data.place}</p>
        <p className="text-sm text-sec-700">Magnitude: {data.mag}</p>
        <p className="text-sm text-sec-700">Depth: {data.depth} km</p>
        <p className="text-sm text-sec-700">
          Time: {moment(data.time).format("YYYY-MM-DD")}
        </p>
      </div>
    );
  }
  return null;
};

interface CustomScatterShapeProps {
  cx?: number;
  cy?: number;
  payload?: EarthquakeData;
}

const CustomScatterShape = (props: CustomScatterShapeProps) => {
  const { cx, cy, payload } = props;
  const { highlightedRecord } = useEarthquakeStore();

  const isHighlighted = highlightedRecord?.id === payload?.id;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={isHighlighted ? 8 : 5}
      fill={isHighlighted ? "red" : "#0061F9"}
      stroke="black"
      strokeWidth={isHighlighted ? 2 : 1}
    />
  );
};
