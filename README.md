# Little Free Library (NFT)


# Contracts

Rinkeby: https://rinkeby.etherscan.io/address/0x2e81dc10b71c6E811f2551EB803d83B74Ace8013#writeContract  

Mainnet: TBD (donate ETH to spf.eth)


# Usage

There are two primary functions to this simple contract:

1. has(tokenAddress, tokenId) which returns true or false whether the little library is holding a given ERC721. The reason for including this function is to quickly check whether the contract is holding a certain NFT without spending gas

```solidity
function has(address contractAddress, uint256 tokenId) public view returns (bool) {
    require(IERC721(contractAddress).supportsInterface(type(IERC721).interfaceId), "Little Library: contract address must support ERC721 interface");
    address ownerOfToken = IERC721(contractAddress).ownerOf(tokenId);
    return ownerOfToken == address(this);
}
```


2. take(tokenAddress, tokenId) which transfers the desired ERC721 to the msg senders wallet

```solidity
function take(address contractAddress, uint256 tokenId) public {
    require(IERC721(contractAddress).supportsInterface(type(IERC721).interfaceId), "Little Library: contract address must support ERC721 interface");
    IERC721(contractAddress).safeTransferFrom(address(this), msg.sender, tokenId);
}
```

To leave an ERC721 for someone, simply send the ERC721 to the address of the contract!


# Development

Testing: `yarn run test`  
Deploying: `yarn run script scripts/deployLittleLibrary.ts --network rinkeby`  
Verifying: `npx hardhat verify --network mainnet <DEPLOYED_CONTRACT_ADDRESS>`  
