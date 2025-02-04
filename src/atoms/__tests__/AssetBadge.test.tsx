import { render, screen } from "@testing-library/react";
import { AssetBadge } from "../AssetBadge";

describe("AssetBadge", () => {
  it("renders value with correct formatting", () => {
    render(<AssetBadge value={1000} />);
    expect(screen.getByText("1,000")).toBeInTheDocument();
  });

  it("applies small size styles by default", () => {
    render(<AssetBadge value={1000} />);
    const badge = screen.getByText("1,000");
    expect(badge).toHaveStyle({ fontSize: "14px" });
  });

  it("applies large size styles when specified", () => {
    render(<AssetBadge value={1000} size="large" />);
    const badge = screen.getByText("1,000");
    expect(badge).toHaveStyle({ fontSize: "20px" });
  });
});
