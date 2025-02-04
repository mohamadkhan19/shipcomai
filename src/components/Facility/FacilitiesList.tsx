import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { Facility } from "../../types/facility";
import { FacilityCard } from "./FacilityCard";

interface FacilitiesListProps {
  facilities: Facility[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFacilitySelect: (facility: Facility) => void;
}

export const FacilitiesList: React.FC<FacilitiesListProps> = ({
  facilities,
  searchTerm,
  onSearchChange,
  onFacilitySelect,
}) => {
  return (
    <Box sx={{ width: "40%" }}>
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
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "grey", mr: 1 }} />,
          }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onSelect={onFacilitySelect}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
