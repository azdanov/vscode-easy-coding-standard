import { Output } from "../Output";

describe("Output", () => {
  it("should send a message to given outputChannel", () => {
    const appendLine = jest.fn();
    const outputChannel: any = { appendLine };
    const output = new Output(outputChannel);

    output.send("Testing");

    expect(appendLine).toBeCalled();
  });
});
