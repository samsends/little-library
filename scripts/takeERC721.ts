import { ethers } from "hardhat";
import { utils } from 'ethers'


const LITTLE_LIBRARY_ADDRESS = '0x929378707faFE67337A5b4762fE861E55726DeCf'
const ERC721_ADDRESS = '0x929378707faFE67337A5b4762fE861E55726DeCf'
const ERC721_TOKEN_ID = 0

async function main() {
    const contractFactory = await ethers.getContractFactory("LittleLibrary");
    const littleLibrary = contractFactory.attach(LITTLE_LIBRARY_ADDRESS);
    await littleLibrary.take(ERC721_ADDRESS, ERC721_TOKEN_ID)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });