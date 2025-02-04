import { fireEvent, render, screen } from "@testing-library/react";
import { useFacilities } from "../../../hooks/useFacilities";
import { MapComponent } from "../MapComponent";

jest.mock("../../../hooks/useFacilities");
jest.mock("@react-google-maps/api", () => ({
  LoadScript: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  GoogleMap: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
  Marker: () => <div data-testid="map-marker" />,
}));

jest.mock("../../../atoms/RegionSelect", () => ({
  RegionSelect: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <select
      data-testid="region-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="FRC East">FRC East</option>
      <option value="FRC West">FRC West</option>
    </select>
  ),
}));

describe("MapComponent", () => {
  const mockUseFacilities = {
    searchTerm: "",
    setSearchTerm: jest.fn(),
    selectedFacility: null,
    mapCenter: { lat: 0, lng: 0 },
    zoom: 10,
    filteredFacilities: [],
    totalAssets: 0,
    handleFacilitySelect: jest.fn(),
  };

  beforeEach(() => {
    (useFacilities as jest.Mock).mockReturnValue(mockUseFacilities);
  });

  it("renders without crashing", () => {
    render(<MapComponent />);
    expect(screen.getByText("Asset Tracking")).toBeInTheDocument();
  });

  it("displays total assets badge", () => {
    const mockWithAssets = {
      ...mockUseFacilities,
      totalAssets: 42,
    };
    (useFacilities as jest.Mock).mockReturnValue(mockWithAssets);

    render(<MapComponent />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders map with marker when facility is selected", () => {
    const mockWithSelectedFacility = {
      ...mockUseFacilities,
      selectedFacility: {
        id: 1,
        name: "Test Facility",
        lat: 35.123,
        lng: -80.123,
      },
    };
    (useFacilities as jest.Mock).mockReturnValue(mockWithSelectedFacility);

    render(<MapComponent />);
    expect(screen.getByTestId("google-map")).toBeInTheDocument();
    expect(screen.getByTestId("map-marker")).toBeInTheDocument();
  });

  it("allows region selection", () => {
    render(<MapComponent />);
    const regionSelect = screen.getByTestId("region-select");
    fireEvent.change(regionSelect, { target: { value: "FRC West" } });
    expect(regionSelect).toHaveValue("FRC West");
  });
});
