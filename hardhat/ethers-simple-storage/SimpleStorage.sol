// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.7;

contract SimpleStorage {
  uint256 favoriteNumber;
  People[] public people;
  struct People {
    string name;
    uint256 favoriteNumber;
  }
  mapping (string => uint) nameToFavoriteNumber;
  constructor() {
    
  }
  function store(uint256 _favoriteNumber)  public {
    favoriteNumber = _favoriteNumber;
  }
  function addPeople(string memory _name, uint256 _favoriteNumber) public {
    people.push(People(_name, _favoriteNumber));
    nameToFavoriteNumber[_name] = _favoriteNumber;
  }
  function retrieve() public view returns (uint256){
    return favoriteNumber;
  }

}