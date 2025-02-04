import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

interface RegionSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const RegionSelect: React.FC<RegionSelectProps> = ({
  value,
  onChange,
}) => (
  <FormControl sx={{ minWidth: 120 }}>
    <Select
      id="region-select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      sx={{ height: "40px" }}
    >
      {["East", "West", "North"].map((region) => (
        <MenuItem
          key={region}
          value={`FRC ${region}`}
          sx={{ display: "flex", alignItems: "center", height: "35px" }}
        >
          <LocationOnIcon sx={{ mr: 1 }} /> FRC {region}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
