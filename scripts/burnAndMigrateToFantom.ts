import { ethers, upgrades } from "hardhat";

async function main() {

    let alfa:any;
    [alfa] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("KavaERC20");
    const token = await Token.attach(process.env.KAVA_TOKEN_ADDRESS);

    let tx = await token.balanceOf(alfa.address);
    console.log("Balance is", tx.toString());
    console.log("Sent");


    let tx1 = await token.transferRemote(ethers.utils.parseEther('100'),{value:ethers.utils.parseEther("1.2")});
    await tx1.wait();
    console.log("Sent");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
