// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestERC721 is ERC721 {
    constructor() ERC721("Test ERC721", "TEST") {}

    function mint(address to, uint256 tokenId) public  {
        _mint(to, tokenId);
    }
}