import { Box } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import { AssetBadge } from "../../atoms/AssetBadge";
import { RegionSelect } from "../../atoms/RegionSelect";
import { useFacilities } from "../../hooks/useFacilities";
import { FacilitiesList } from "../Facility/FacilitiesList";
const mapContainerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "8px",
};

export const MapComponent: React.FC = () => {
  const [region, setRegion] = React.useState("FRC East");
  const {
    searchTerm,
    setSearchTerm,
    selectedFacility,
    mapCenter,
    zoom,
    filteredFacilities,
    totalAssets,
    handleFacilitySelect,
  } = useFacilities();

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
        marginTop: "80px",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <div style={{ color: "grey" }}>Asset Tracking</div>
          <AssetBadge value={totalAssets} size="large" />
        </Box>
        <RegionSelect value={region} onChange={setRegion} />
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", gap: 3 }}>
        <FacilitiesList
          facilities={filteredFacilities}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFacilitySelect={handleFacilitySelect}
        />

        <Box
          sx={{
            width: "60%",
            backgroundColor: "white",
            borderRadius: "8px",
            p: 3,
          }}
        >
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={zoom}
              center={mapCenter}
            >
              {selectedFacility && (
                <Marker
                  position={{
                    lat: selectedFacility.lat,
                    lng: selectedFacility.lng,
                  }}
                  onClick={() => handleFacilitySelect(selectedFacility)}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </Box>
      </Box>
    </div>
  );
};
