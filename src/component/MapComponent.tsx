import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";

// Define the facility type
interface Facility {
  id: number;
  name: string;
  address: string;
  icon: string;
  assets: number;
  lat: number;
  lng: number;
}

// Updated dummy data with assets
const facilities: Facility[] = [
  {
    id: 1,
    name: "Downtown Office",
    address: "123 Main Street, New York, NY 10001",
    icon: "🏢",
    assets: 50000,
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "West Coast Hub",
    address: "456 Tech Boulevard, San Francisco, CA 94105",
    icon: "🏭",
    assets: 85000,
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 3,
    name: "South Center",
    address: "789 Palm Avenue, Miami, FL 33101",
    icon: "🏗️",
    assets: 75000,
    lat: 25.7617,
    lng: -80.1918,
  },
];

// Add map styles
const mapContainerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "8px",
};

const center = {
  lat: 39.8283, // Center of US
  lng: -98.5795,
};

function MapComponent() {
  const [region, setRegion] = React.useState("FRC East");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    facilities[0] // Initialize with the first facility
  );

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total assets
  const totalAssets = facilities.reduce(
    (sum, facility) => sum + facility.assets,
    0
  );

  // Add your Google Maps API key here
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  // Add mapCenter state to control map position
  const [mapCenter, setMapCenter] = useState({
    lat: facilities[0].lat,
    lng: facilities[0].lng,
  });

  // Add zoom state
  const [zoom, setZoom] = useState(4);

  // Update map center when facility is selected
  const handleFacilitySelect = (facility: Facility) => {
    setSelectedFacility(facility);
    setMapCenter({
      lat: facility.lat,
      lng: facility.lng,
    });
    setZoom(12); // Changed from 9 to 12 for a closer view
  };

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
      {/* Top Section - Asset Tracking and Region Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ color: "grey" }}>Asset Tracking</div>
          <div
            style={{
              backgroundColor: "purple",
              color: "white",
              padding: "4px 12px",
              borderRadius: "20px",
              display: "inline-block",
              fontSize: "20px",
            }}
          >
            {totalAssets.toLocaleString()}
          </div>
        </div>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            id="region-select"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            sx={{ height: "40px" }}
          >
            <MenuItem
              value="FRC East"
              sx={{ display: "flex", alignItems: "center", height: "35px" }}
            >
              <LocationOnIcon sx={{ mr: 1 }} /> FRC East
            </MenuItem>
            <MenuItem
              value="FRC West"
              sx={{ display: "flex", alignItems: "center", height: "35px" }}
            >
              <LocationOnIcon sx={{ mr: 1 }} /> FRC West
            </MenuItem>
            <MenuItem
              value="FRC North"
              sx={{ display: "flex", alignItems: "center", height: "35px" }}
            >
              <LocationOnIcon sx={{ mr: 1 }} /> FRC North
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Main Content - Facilities and Map */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Section - Facilities List */}
        <div style={{ width: "40%" }}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Facilities
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "grey", mb: 2 }}>
              {facilities.length} facilities
            </Typography>

            <TextField
              fullWidth
              placeholder="Search by facility"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "grey", mr: 1 }} />,
              }}
              sx={{ mb: 3 }}
            />

            <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
              {filteredFacilities.map((facility) => (
                <Card
                  key={facility.id}
                  sx={{ mb: 2, p: 2, backgroundColor: "#f5f5f5" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "24px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      {facility.icon}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{facility.name}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          mt: 1,
                        }}
                      >
                        <Typography sx={{ color: "grey", fontSize: "14px" }}>
                          Asset
                        </Typography>
                        <div
                          style={{
                            backgroundColor: "purple",
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: "20px",
                            display: "inline-block",
                            fontSize: "14px",
                          }}
                        >
                          {facility.assets.toLocaleString()}
                        </div>
                      </Box>
                      <Button
                        onClick={() => handleFacilitySelect(facility)}
                        endIcon={<ChevronRightIcon />}
                        sx={{
                          color: "purple",
                          textTransform: "none",
                          padding: "4px 0",
                          "&:hover": {
                            backgroundColor: "transparent",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        View Facility
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <LocationOnIcon sx={{ fontSize: 16, mt: "2px" }} />
                      {facility.address}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </div>

        {/* Right Section - Map */}
        <div
          style={{
            width: "60%",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
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
                  key={selectedFacility.id}
                  position={{
                    lat: selectedFacility.lat,
                    lng: selectedFacility.lng,
                  }}
                  onClick={() => handleFacilitySelect(selectedFacility)}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;
