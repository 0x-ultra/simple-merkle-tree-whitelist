const StandardMerkleTree =
  require("@openzeppelin/merkle-tree").StandardMerkleTree;
const fs = require("fs");

// This code parses a json file and creates a standard merkle tree from the data.
// The root of the merkle tree is then printed to the console.
// The data is then parsed again and a proof is created for each data item
// The proofs are then written to a json file

const values = JSON.parse(fs.readFileSync("whitelist.json"))["addresses"].map(
  (address) => [address]
);
const tree = StandardMerkleTree.of(values, ["address"]);

console.log("Merkle Root:", tree.root);

const proofs = {};
for (const [index, value] of values.entries()) {
  proofs[value[0]] = tree.getProof(index);
}

fs.writeFileSync("proofs.json", JSON.stringify(proofs, null, 2));
