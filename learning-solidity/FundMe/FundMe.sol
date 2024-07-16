// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FundMe {
    uint256 public minimumUSD = 50;
    function fund() public payable  {

        require(msg.value >= 1e18, "didn't send enough");

    }

    function withdraw() public payable  {

    }
}