import { Route, Routes } from "react-router-dom";
import ShipcomDashboard from "../pages/ShipcomDashboard";
const ShipcomRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ShipcomDashboard renderComponent={"MapComponent"} />}
      />
    </Routes>
  );
};

export default ShipcomRoutes;
