import { MyContract } from "../../../typechain";

declare module "mocha" {
  export interface Context {
    myContract: MyContract;
  }
}
