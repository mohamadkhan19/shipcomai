import { fireEvent, render, screen } from "@testing-library/react";
import { FacilitiesList } from "../FacilitiesList";

const mockFacilities = [
  {
    id: 1,
    name: "Facility One",
    address: "123 Test St",
    icon: "🏢",
    assets: 50000,
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Facility Two",
    address: "456 Test Ave",
    icon: "🏭",
    assets: 75000,
    lat: 41.7128,
    lng: -75.006,
  },
];

const mockProps = {
  facilities: mockFacilities,
  searchTerm: "",
  onSearchChange: jest.fn(),
  onFacilitySelect: jest.fn(),
};

describe("FacilitiesList", () => {
  it("renders all facilities", () => {
    render(<FacilitiesList {...mockProps} />);

    expect(screen.getByText("Facility One")).toBeInTheDocument();
    expect(screen.getByText("Facility Two")).toBeInTheDocument();
  });

  it("shows correct facility count", () => {
    render(<FacilitiesList {...mockProps} />);

    expect(screen.getByText("2 facilities")).toBeInTheDocument();
  });

  it("handles search input changes", () => {
    render(<FacilitiesList {...mockProps} />);

    const searchInput = screen.getByPlaceholderText("Search by facility");
    fireEvent.change(searchInput, { target: { value: "One" } });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith("One");
  });
});
