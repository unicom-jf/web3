//import { hre } from "hardhat";
import hre from "hardhat";
import { assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
describe("SimpleStorage", () => {
  let factory: SimpleStorage__factory;
  let contract: SimpleStorage;
  beforeEach(async () => {
    factory = await hre.ethers.getContractFactory("SimpleStorage");
    contract = await factory.deploy();
    contract = await contract.waitForDeployment();
  });

  it("Should start with a value of 0", async () => {
    const currentValue = await contract.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async () => {
    const expectedValue = "7";
    let txResponse = await contract.store(expectedValue);
    await txResponse.wait(1);
    const currentValue = await contract.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
