import { ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../../helper-hardhat-config";
import { deployments } from "hardhat";
import { Greeter } from "../../../typechain";
import { expect } from "chai";
import { shouldBehaveLikeGreeter } from "./Greeter.behavior";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Greeter Unit Tests", async function () {
      beforeEach(async function () {
        const { deployer } = await getNamedAccounts();
        await deployments.fixture("greeter");
        const greeter: Greeter = await ethers.getContract("Greeter", deployer);
        this.greeter = greeter;
        this.deployer = deployer;
      });

      it("inits with a message", async function () {
        const message = await this.greeter.greet();
        expect(message).to.not.be.empty;
        console.log(message);
      });

      shouldBehaveLikeGreeter();
    });
