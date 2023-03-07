// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
import { IERC20CrossChain } from './IERC20CrossChain.sol';
import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { StringToAddress, AddressToString } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/utils/AddressString.sol';

contract bridgeTokenToKava is OwnableUpgradeable, AxelarExecutable {
    using StringToAddress for string;
    using AddressToString for address;
    IERC20CrossChain public token;
    IAxelarGasService public  gasService;
    
    string public destinationAddress;
    
    
    function initialize(address tokenAddress, address gateway_, address gasReceiver_) public initializer {
        token = IERC20CrossChain(tokenAddress);
        __Ownable_init();
        AxelarExecutable__init(gateway_);
        gasService = IAxelarGasService(gasReceiver_);
    }
    
    function setDestinationAddress(string memory destinationAddress_) public onlyOwner {
        destinationAddress = destinationAddress_;
    }

    function lockAndTransferTokenToKava(uint256 amount) public payable {
        token.transferFrom(msg.sender, address(this), amount);
        bytes memory payload = abi.encode(msg.sender, amount);
        if (msg.value > 0) {
            gasService.payNativeGasForContractCall{ value: msg.value }(
                address(this),
                "kava",
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract("kava", destinationAddress, payload);
    }
    
    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) internal override {
        (address to, uint256 amount) = abi.decode(payload, (address, uint256));
        token.transfer(to, amount);
    }
}
