# Simple Merkle Tree Whitelist

Quick utility for generating a json file containing all proofs for a tree given a list of wallets to add to the merkle tree.  
Can be used for smart contract whitelisting purposes in applications where no `value` parameter is needed besides a `msg.sender`

## Usage

Insert your wallet addresses in the `whitelist.json` file following the example format.

```bash
npm install
node main.js
```

This will generate a `proofs.json` file containing all proofs for the tree.
The merkle root is also printed in the console.

## Verifier

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Verifier {
    bytes32 private root;

    constructor(bytes32 _root) {
        root = _root;
    }

    function verify(
        bytes32[] memory proof
    ) public returns(bool){
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender))));
        require (MerkleProof.verify(proof, root, leaf), "Proof not valid");
    }
}

```
