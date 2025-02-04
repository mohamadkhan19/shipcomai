import { act, renderHook } from "@testing-library/react";
import { useFacilities } from "../useFacilities";

describe("useFacilities", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useFacilities());

    expect(result.current.searchTerm).toBe("");
    expect(result.current.zoom).toBe(4);
    expect(result.current.selectedFacility).toBeTruthy();
  });

  it("filters facilities based on search term", () => {
    const { result } = renderHook(() => useFacilities());

    act(() => {
      result.current.setSearchTerm("Downtown");
    });

    expect(result.current.filteredFacilities).toHaveLength(1);
    expect(result.current.filteredFacilities[0].name).toContain("Downtown");
  });

  it("updates map when facility is selected", () => {
    const { result } = renderHook(() => useFacilities());
    const testFacility = {
      id: 1,
      name: "Test Facility",
      address: "Test Address",
      icon: "🏢",
      assets: 1000,
      lat: 40.7128,
      lng: -74.006,
    };

    act(() => {
      result.current.handleFacilitySelect(testFacility);
    });

    expect(result.current.selectedFacility).toBe(testFacility);
    expect(result.current.mapCenter).toEqual({
      lat: testFacility.lat,
      lng: testFacility.lng,
    });
    expect(result.current.zoom).toBe(12);
  });
});
