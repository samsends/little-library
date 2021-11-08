import { expect } from './setup'
import { ethers } from 'hardhat'
import { Contract, Signer, BigNumber, utils } from 'ethers'



describe('Little Library', () => {
    let Deployer: Signer
    let Minter: Signer
    let Claimer: Signer


    let LittleLibrary: Contract
    let TestERC721: Contract



    beforeEach(async () => {
        [Deployer, Minter, Claimer] = await ethers.getSigners()

        const littleLibraryFactory = await ethers.getContractFactory("LittleLibrary");
        LittleLibrary = await littleLibraryFactory.deploy();
        await LittleLibrary.deployed();

        const erc721Factory = await ethers.getContractFactory("TestERC721");
        TestERC721 = await erc721Factory.deploy();
        await TestERC721.deployed();
    })

    describe('Name & Symbol Testing', () => {
        it('should have expected name', async () => {
            expect(await TestERC721.name()).to.equal("Test ERC721")
        })
        it('should have expected symbol', async () => {
            expect(await TestERC721.symbol()).to.equal("TEST")
        })
    })


    describe('Take & Has Testing', () => {
        it('should return true for a token that it has', async () => {
            await TestERC721.mint(LittleLibrary.address, BigNumber.from("0"))
            expect(await LittleLibrary.has(TestERC721.address, BigNumber.from("0"))).to.equal(true)
        })
        it('should return false for a token that it has', async () => {
            await TestERC721.mint(await Minter.getAddress(), BigNumber.from("7"))
            expect(await LittleLibrary.has(TestERC721.address, BigNumber.from("7"))).to.equal(false)
        })

        it('should be able to take an ERC721', async () => {
            await TestERC721.mint(LittleLibrary.address, BigNumber.from("0"))
            await LittleLibrary.connect(Claimer).take(TestERC721.address, BigNumber.from("0"))
            expect(await TestERC721.ownerOf(BigNumber.from("0"))).to.equal(await Claimer.getAddress())
        })

    })

})