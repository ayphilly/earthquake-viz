import moment from "moment";
import { useEarthquakeContext } from "../context/EarthquakeContext";

export const SelectedQuake = () => {
  const { selectedEarthquake } = useEarthquakeContext();

  if (!selectedEarthquake) return null;
  else
    return (
      <div className=" mt-4 p-4 bg-white rounded-lg border border-main-200">
        <h3 className="font-semibold text-main-902 mb-2">
          Selected Earthquake Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Location:</strong> {selectedEarthquake.place}
          </div>
          <div>
            <strong>Magnitude:</strong> {selectedEarthquake.mag}
          </div>
          <div>
            <strong>Depth:</strong> {selectedEarthquake.depth} km
          </div>
          <div>
            <strong>Time:</strong>{" "}
            {moment(selectedEarthquake.time).format("YYYY-MM-DD")}
          </div>
          <div>
            <strong>Type:</strong> {selectedEarthquake.type}
          </div>
          <div>
            <strong>Status:</strong> {selectedEarthquake.status}
          </div>
        </div>
      </div>
    );
};
