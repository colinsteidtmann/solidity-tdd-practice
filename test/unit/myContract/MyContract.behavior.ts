import { expect } from "chai";
import { ethers } from "hardhat";
import { MyContract } from "../../../typechain";

export function shouldBehaveLikeMyContract() {
  describe("types", function () {
    it("should have a true boolean state var", async function () {
      const value = await this.myContract.trueBoolean();
      expect(value).to.be.true;
    });
    it("should have a positive uint", async function () {
      expect(await this.myContract.unsignedInt()).to.equal(5);
    });
    it("should have a negative int", async function () {
      expect(await this.myContract.signedInt()).to.equal(-5);
    });
    it("should have a contract address", async function () {
      expect(await this.myContract.contractAddress()).to.equal(this.myContract.address);
    });
  });
  describe("variables", function () {
    it("should not save local variables", async function () {
      await this.myContract.saveNothing();
      expect(await (this.myContract as any).localVariable).to.be.undefined;
    });
    it("should have global variables", async function () {
      expect(await this.myContract.globalTimestamp()).to.gt(0);
    });
    it("should have a constant string", async function () {
      expect(await this.myContract.constantString()).to.equal("colin");
    });
    it("should have an immutable uint", async function () {
      expect(await this.myContract.immutableUint()).to.gt(0);
    });
  });
  describe("reading and writing", function () {
    it("should set and get a uint variable", async function () {
      await this.myContract.setNum(5);
      expect(await this.myContract.getNum()).to.equal(5);
    });
  });
  describe("playing with gas", function () {
    it("should spend gas", async function () {
      const gasPrice = await ethers.provider.getGasPrice();
      const tx = await this.myContract.loop();
      const gasUsed = (await tx.wait(1)).gasUsed;
      console.log(`gasPrice: %s, gasUsed: %s`, gasPrice.toString(), gasUsed.toString());
    });
  });
}
