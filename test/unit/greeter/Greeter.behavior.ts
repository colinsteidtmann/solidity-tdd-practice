import { expect } from "chai";

export function shouldBehaveLikeGreeter() {
  describe("changing the message", async function () {
    it("changes greeting state variable", async function () {
      await this.greeter.setGreeting("New message");
      const message = await this.greeter.greet();
      expect(message).to.equal("New message");
    });
  });
}
