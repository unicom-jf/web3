// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "./ExtraStorage.sol";

contract StorageFactory {
  ExtraStorage[] extraStorageArray;

  function createSimpleStorageContract() public {
    ExtraStorage extraStorage = new ExtraStorage();
    extraStorageArray.push(extraStorage);
  }

  function sfStore(uint idx, uint _favoriteNumber) public {
    extraStorageArray[idx].store(_favoriteNumber);
  }

  function sfGet(uint idx) public view returns(uint) {
    return extraStorageArray[idx].retreive();
  }
}
