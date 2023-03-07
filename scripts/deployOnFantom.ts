import { ethers, upgrades } from "hardhat";

async function main() {

  const ERC20 = await ethers.getContractFactory("FantomERC20");
  const erc20 = await upgrades.deployProxy(ERC20, []);
  await erc20.deployed();
  console.log("FantomERC20 deployed to:", erc20.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
