import Container from "@mui/material/Container";
import React, { useEffect } from "react";
import { MapComponent } from "../components/Map/MapComponent";
import { SideBar } from "../navigation/SideBar/SideBar";

const ShipcomDashboard = (props: { renderComponent: string }) => {
  const [label, setLabel] = React.useState("Home");

  useEffect(() => {
    switch (props.renderComponent) {
      default:
        setLabel("SHIPCOM.AI");
        break;
    }
  }, [props]);

  const renderComponent = (content: string) => {
    switch (content) {
      case "MapComponent":
        return <MapComponent />;
      default:
        break;
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <SideBar
          title={label}
          component={renderComponent(props.renderComponent)}
        />
      </Container>
    </div>
  );
};

export default ShipcomDashboard;
