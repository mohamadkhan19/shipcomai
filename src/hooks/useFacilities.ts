import { useState } from "react";
import { facilities } from "../data/facilities";
import { Facility } from "../types/facility";

export const useFacilities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    facilities[0]
  );
  const [mapCenter, setMapCenter] = useState({
    lat: facilities[0].lat,
    lng: facilities[0].lng,
  });
  const [zoom, setZoom] = useState(4);

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAssets = facilities.reduce(
    (sum, facility) => sum + facility.assets,
    0
  );

  const handleFacilitySelect = (facility: Facility) => {
    setSelectedFacility(facility);
    setMapCenter({
      lat: facility.lat,
      lng: facility.lng,
    });
    setZoom(12);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedFacility,
    mapCenter,
    zoom,
    filteredFacilities,
    totalAssets,
    handleFacilitySelect,
  };
};
