import { ethers, upgrades } from "hardhat";

async function main() {

    const Bridge = await ethers.getContractFactory("KavaERC20");
    const bridge = await Bridge.attach(process.env.KAVA_TOKEN_ADDRESS);

    let tx = await bridge.setDestinationAddress(process.env.FANTOM_TOKEN_LOCKER);
    await tx.wait();
    console.log("Destination address is set");


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
