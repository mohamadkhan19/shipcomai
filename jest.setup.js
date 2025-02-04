import "@testing-library/jest-dom";

jest.mock("@react-google-maps/api", () => ({
  GoogleMap: ({ children }) => <div>{children}</div>,
  Marker: () => <div>Marker</div>,
  LoadScript: ({ children }) => <div>{children}</div>,
}));
