import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { EarthquakeProvider } from "./context/EarthquakeContext";
import { ViewContent } from "./containers/ViewContent";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <EarthquakeProvider>
        <ViewContent />
      </EarthquakeProvider>
    </Provider>
  );
};

export default App;
