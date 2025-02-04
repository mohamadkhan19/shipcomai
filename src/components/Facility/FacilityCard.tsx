import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { AssetBadge } from "../../atoms/AssetBadge";
import { Facility } from "../../types/facility";

interface FacilityCardProps {
  facility: Facility;
  onSelect: (facility: Facility) => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  facility,
  onSelect,
}) => (
  <Card sx={{ mb: 2, p: 2, backgroundColor: "#f5f5f5" }}>
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
          <AssetBadge value={facility.assets} size="small" />
        </Box>
        <Button
          onClick={() => onSelect(facility)}
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
);
