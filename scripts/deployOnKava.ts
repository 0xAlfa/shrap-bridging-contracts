import { ethers, upgrades } from "hardhat";

async function main() {

    const ERC20 = await ethers.getContractFactory("KavaERC20");
    const erc20 = await upgrades.deployProxy(ERC20, [process.env.KAVA_GATEWAY_ADDRESS,process.env.KAVA_GAS_SERVICE_ADDRESS]);
    await erc20.deployed();
    console.log("FantomERC20 deployed to:", erc20.address);

    let tx = await erc20.giveMe(ethers.utils.parseEther("1000000"));
    await tx.wait();
    console.log("Minted 100000 tokens to the user");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
