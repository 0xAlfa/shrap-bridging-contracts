// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IERC20CrossChain } from './IERC20CrossChain.sol';
import { ERC20Upgradeable } from '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { StringToAddress, AddressToString } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/utils/AddressString.sol';

contract KavaERC20 is AxelarExecutable, ERC20Upgradeable, OwnableUpgradeable {
    using StringToAddress for string;
    using AddressToString for address;
    
    string public destinationAddress;
    event FalseSender(string sourceChain, string sourceAddress);
    
    IAxelarGasService public  gasService;
    
    function initialize(address gateway_, address gasReceiver_) external initializer {
        AxelarExecutable__init(gateway_);
        __ERC20_init('kavaERC20', 'kavaERC20');
        __Ownable_init();
        gasService = IAxelarGasService(gasReceiver_);
    }
    
    function setDestinationAddress(string memory destinationAddress_) public onlyOwner {
        destinationAddress = destinationAddress_;
    }
    
    // This is for testing.
    function giveMe(uint256 amount) external {
        _mint(msg.sender, amount);
    }
    
    function transferRemote(
        uint256 amount
    ) public payable {
        _burn(msg.sender, amount);
        bytes memory payload = abi.encode(msg.sender, amount);
        if (msg.value > 0) {
            gasService.payNativeGasForContractCall{ value: msg.value }(
                address(this),
                "Fantom",
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract("Fantom", destinationAddress, payload);
    }
    
    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) internal override {
        (address to, uint256 amount) = abi.decode(payload, (address, uint256));
        _mint(to, amount);
    }
    
    function contractId() external pure returns (bytes32) {
        return keccak256('example');
    }
}
