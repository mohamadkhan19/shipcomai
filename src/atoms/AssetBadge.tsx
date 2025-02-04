import React from "react";

interface AssetBadgeProps {
  value: number;
  size?: "small" | "large";
}

export const AssetBadge: React.FC<AssetBadgeProps> = ({
  value,
  size = "small",
}) => (
  <div
    style={{
      backgroundColor: "purple",
      color: "white",
      padding: size === "large" ? "4px 12px" : "2px 8px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: size === "large" ? "20px" : "14px",
    }}
  >
    {value.toLocaleString()}
  </div>
);
