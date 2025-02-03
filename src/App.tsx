import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShipcomRoutes from "./routes/ShipcomRoutes";
function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ShipcomRoutes />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
