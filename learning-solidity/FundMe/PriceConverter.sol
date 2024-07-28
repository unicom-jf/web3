// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice() public view returns(uint256){
        //ABI
        //Address sepolia testnet:0x694AA1769357215DE4FAC081bf1f309aDC325306
        //AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int price,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getVersion() public view returns(uint256) {
        //AggregatorV3Interface priceFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();
    }
    function getDecimals() public view returns(uint256) {
        //AggregatorV3Interface priceFeed = AggregatorV3Interface()
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.decimals();
    }
    function getConversionRate(uint256 ethAmount) public view returns(uint256) {
        return (ethAmount * getPrice()) / 1e18;
    }

}