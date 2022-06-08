import { ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../../helper-hardhat-config";
import { deployments } from "hardhat";
import { MyContract } from "../../../typechain";
import { expect } from "chai";
import { shouldBehaveLikeMyContract } from "./MyContract.behavior";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("MyContract Unit Tests", async function () {
      beforeEach(async function () {
        const { deployer } = await getNamedAccounts();
        await deployments.fixture("myContract");
        const myContract: MyContract = await ethers.getContract("MyContract", deployer);
        this.myContract = myContract;
        this.deployer = deployer;
      });

      shouldBehaveLikeMyContract();
    });
