import { fireEvent, render, screen } from "@testing-library/react";
import { RegionSelect } from "../RegionSelect";

describe("RegionSelect", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with initial value", () => {
    render(<RegionSelect value="FRC East" onChange={mockOnChange} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveTextContent("FRC East");
  });

  it("displays all region options", () => {
    render(<RegionSelect value="FRC East" onChange={mockOnChange} />);

    fireEvent.mouseDown(screen.getByRole("combobox"));

    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveTextContent("FRC East");
    expect(options[1]).toHaveTextContent("FRC West");
    expect(options[2]).toHaveTextContent("FRC North");
  });

  it("calls onChange when a new region is selected", () => {
    render(<RegionSelect value="FRC East" onChange={mockOnChange} />);

    fireEvent.mouseDown(screen.getByRole("combobox"));

    fireEvent.click(screen.getByText("FRC West"));

    expect(mockOnChange).toHaveBeenCalledWith("FRC West");
  });

  it("renders location icons for each option", () => {
    render(<RegionSelect value="FRC East" onChange={mockOnChange} />);

    fireEvent.mouseDown(screen.getByRole("combobox"));

    const menuOptions = screen.getAllByRole("option");
    menuOptions.forEach((option) => {
      expect(
        option.querySelector('[data-testid="LocationOnIcon"]')
      ).toBeInTheDocument();
    });
  });
});
