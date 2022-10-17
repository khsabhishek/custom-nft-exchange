/*

  << Test Token (for use with the Test DAO) >>

*/
// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
  * @title TestToken
  * @author Project Wyvern Developers
  */
contract erc20 is ERC20 {
  
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    }

    function mint(address account) external payable {
      require(msg.value >= 1E12);
      pay();
      _mint(account, (msg.value * 1E6));
    }

    function burn(address payable account, uint256 amount) external payable {
      require(balanceOf(account) >= amount,"account doesnt have enough balance");
      _burn(account, amount);
      amount =  (amount / 1E6) ;
      payable(account).transfer(amount);
    }

    function contractBalance() public view returns(uint256) {
      uint256 balance =  address(this).balance;
      return balance;
    }

    function pay() public  payable {
    }

}