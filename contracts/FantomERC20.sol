// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { ERC20Upgradeable } from '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract FantomERC20 is ERC20Upgradeable, OwnableUpgradeable {
    
    
    function initialize() external initializer {
        __ERC20_init('FantomERC20', 'FantomERC20');
        __Ownable_init();
    }
    
    
    // This is for testing.
    function giveMe(uint256 amount) external {
        _mint(msg.sender, amount);
    }
    
}
