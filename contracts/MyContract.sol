//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyContract {
  /** Types */
  bool public trueBoolean = true;
  uint256 public unsignedInt = 5;
  int256 public signedInt = -5;
  address public contractAddress = address(this);
  /** Variables */
  uint256 public globalTimestamp = block.timestamp;
  string public constant constantString = "colin";
  uint256 public immutable immutableUint;

  constructor(uint256 _uInt) {
    immutableUint = _uInt;
  }

  function saveNothing() public {
    uint256 localVariable = 100;
  }

  /** Reading and Writing */
  uint256 private num;

  function setNum(uint256 _num) public {
    num = _num;
  }

  function getNum() public view returns (uint256 _num) {
    _num = num;
  }

  /** Gas */
  uint256 public count = 0;

  function loop() public {
    while (count <= 100) {
      count++;
    }
  }
}
