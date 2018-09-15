import { Output } from "../Output";

describe("Output", () => {
  it("should send a message to given outputChannel", () => {
    const appendLine = jest.fn();
    const show = jest.fn();
    const outputChannel: any = { appendLine, show };
    const output = new Output(outputChannel);

    output.send("Testing");

    expect(appendLine).toBeCalled();
    expect(show).toBeCalled();
  });
});
