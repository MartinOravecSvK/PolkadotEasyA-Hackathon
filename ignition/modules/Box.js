// 1.  Import the `buildModule` function from the Hardhat Ignition module
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
// 2. Export a module using `buildModule`
module.exports = buildModule("BoxModule", (m) => {
  // 3. Use the `getAccount` method to select the deployer account
  const deployer = m.getAccount(0);
  // 4. Deploy the `Box` contract
  const box = m.contract("Box", [], {
    from: deployer,
  });
  // 5. Return an object from the module
  return { box };
});