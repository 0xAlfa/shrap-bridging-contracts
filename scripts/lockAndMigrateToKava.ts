import { ethers, upgrades } from "hardhat";

async function main() {

    const Token = await ethers.getContractFactory("FantomERC20");
    const token = await Token.attach(process.env.FANTOM_TOKEN_ADDRESS);
    const Bridge = await ethers.getContractFactory("bridgeTokenToKava");
    const bridge = await Bridge.attach(process.env.FANTOM_TOKEN_LOCKER);

    // let mintToken = await token.giveMe(ethers.utils.parseEther("1000000"));
    // await mintToken.wait();
    // console.log("Minted 100000 tokens to the user");
    // let approve = await token.approve(process.env.FANTOM_TOKEN_LOCKER, ethers.utils.parseEther("100000"));
    // await approve.wait();
    // console.log("Approved");

    let send = await bridge.lockAndTransferTokenToKava(ethers.utils.parseEther("100"), {value:ethers.utils.parseEther("18")});
    await send.wait();
    console.log("Sent");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
