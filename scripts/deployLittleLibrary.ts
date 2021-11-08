import { ethers } from "hardhat";



async function main() {
    const contractFactory = await ethers.getContractFactory("LittleLibrary");
    const littleLibrary = await contractFactory.deploy();
    await littleLibrary.deployed();
    console.log(littleLibrary.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });