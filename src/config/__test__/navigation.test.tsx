import { navigationItems } from "../navigation";

describe("navigationItems", () => {
  it("should contain correct navigation items with proper structure", () => {
    expect(navigationItems).toHaveLength(3);

    expect(navigationItems[0]).toEqual({
      text: "Map",
      icon: expect.any(Object),
      path: "/",
    });

    expect(navigationItems[1]).toEqual({
      text: "List",
      icon: expect.any(Object),
      path: "/list",
    });

    expect(navigationItems[2]).toEqual({
      text: "Account",
      icon: expect.any(Object),
      path: "/account",
    });
  });
});
