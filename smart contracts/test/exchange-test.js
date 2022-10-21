const { expect } = require("chai");

describe("smart contract", function () {

  before( async function () {
    const token = await hre.ethers.getContractFactory("erc20");
    const Token = await token.deploy("Test", "TS");
    await Token.deployed();
    console.log({Token: Token.address})
  
    const nft = await hre.ethers.getContractFactory("MyToken");
    const NFT = await nft.deploy();
    await Token.deployed();
    console.log({NFT: NFT.address})
  
    const exchange = await hre.ethers.getContractFactory("exchange");
    const Exchange = await exchange.deploy(Token.address, NFT.address);
    await Exchange.deployed();
    console.log({Exchange: Exchange.address})
  });

  it("Able to mint erc20 tokens", async function() {
  });
  
});
