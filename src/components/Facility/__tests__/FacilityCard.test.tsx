import { fireEvent, render, screen } from "@testing-library/react";
import { FacilityCard } from "../FacilityCard";

const mockFacility = {
  id: 1,
  name: "Test Facility",
  address: "123 Test St",
  icon: "🏢",
  assets: 50000,
  lat: 40.7128,
  lng: -74.006,
};

const mockOnSelect = jest.fn();

describe("FacilityCard", () => {
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders facility information correctly", () => {
    render(<FacilityCard facility={mockFacility} onSelect={mockOnSelect} />);

    expect(screen.getByText("Test Facility")).toBeInTheDocument();
    expect(screen.getByText("123 Test St")).toBeInTheDocument();
    expect(screen.getByText("50,000")).toBeInTheDocument();
  });

  it("calls onSelect when View Facility is clicked", () => {
    render(<FacilityCard facility={mockFacility} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText("View Facility"));
    expect(mockOnSelect).toHaveBeenCalledWith(mockFacility);
  });
});
