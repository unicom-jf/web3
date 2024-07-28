// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;
    uint256 public minimumUSD = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    //AggregatorV3Interface internal priceFeed;
    address public owner;
    constructor() {
        //priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        owner = msg.sender;
    }
    function fund() public payable  {
        require(msg.value.getConversionRate() >= minimumUSD, "didn't send enough");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }


    function withdraw() public onlyOwner {
        
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address founder = funders[funderIndex];
            addressToAmountFunded[founder] = 0;
        }
        funders = new address[](0);
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "call failed");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender is not owner!");
        _;
    }
}