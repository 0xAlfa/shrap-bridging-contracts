// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { IERC20Upgradeable } from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';

interface IERC20CrossChain is IERC20Upgradeable {
	function transferRemote(
		string calldata destinationChain,
		address destinationAddress,
		uint256 amount
	) external payable;
}
