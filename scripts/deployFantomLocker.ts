import { ethers, upgrades } from "hardhat";

async function main() {

    const Bridge = await ethers.getContractFactory("bridgeTokenToKava");
    const bridge = await upgrades.deployProxy(Bridge, [process.env.KAVA_TOKEN_ADDRESS,process.env.FANTOM_GATEWAY_ADDRESS,process.env.FANTOM_GAS_SERVICE_ADDRESS]);
    await bridge.deployed();
    console.log("FantomERC20 deployed to:", bridge.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
