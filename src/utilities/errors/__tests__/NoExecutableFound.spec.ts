import { NoExecutableFound } from "..";

describe("NoExecutableFound", () => {
  it("should create an instance of NoExecutableFound", () => {
    expect(new NoExecutableFound()).toBeObject();
  });

  it("should have a default message", () => {
    expect(() => {
      throw new NoExecutableFound();
    }).toThrowErrorMatchingInlineSnapshot(`"Executable not found"`);
  });
});
