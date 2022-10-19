// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.12;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface nft {
    function safeMint(address to, uint256 tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
    function burn(uint256 tokenId) external;
}

contract exchange is Ownable {

    uint96 public price;

    address public nftAddress;
    address public admin;
    IERC20 public erc20;

    event buy(address _to, uint256 _tokenId, uint256 _amounts);

    event sell(uint256 _tokenId, uint256 amount, uint256 adminAmount);

    mapping(uint256 => uint256) private userAmount;

    constructor(
        address _erc20,
        address _nft
    ) {
        erc20 = IERC20(_erc20);
        nftAddress =   _nft;
    }

    function buyNFT(address _to, uint256 _tokenId, uint256 _amount) external {
        require(_to != address(0), "To address cannot be zero");
        require(erc20.balanceOf(msg.sender) >= _amount, "Sender doesnt have enough erc20 tokens");
        require(_amount == price, "Incorrect input amount");

        userAmount[_tokenId] = _amount;

        erc20.transferFrom(msg.sender, address(this), _amount);

        nft(nftAddress).safeMint(_to, _tokenId);

        emit buy(_to, _tokenId, _amount);
    }

    function sellNFT(uint256 _tokenId) external {
        require(nft(nftAddress).ownerOf(_tokenId) == msg.sender, "msg.sender is not the owner of the token");

        nft(nftAddress).burn(_tokenId);
        
        uint256 amount = userAmount[_tokenId];

        uint256 adminAmount = amount * 17 / 1000;
        
        amount = amount - adminAmount;

        erc20.transfer(admin, adminAmount);
        erc20.transfer(msg.sender, amount);

        emit sell(_tokenId, amount, adminAmount);
    }

    function priceOfNFT(uint96 _price) external onlyOwner {
        require(_price != 0, "Price cannot be zero");
        price = _price;
    }

    function setAdmin(address _admin) external  onlyOwner {
        require(_admin != address(0), "Admin cannot be a zero address");
        admin = _admin;
    }
}