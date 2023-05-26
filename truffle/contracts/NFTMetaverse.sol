// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract NFTMetaverse {
    uint public cost; // Coût d'une maison
    uint public maxSupply; // Quantité totale de maisons disponibles
    uint public totalSupply; // Dotation maximale de maisons qu'un utilisateur peut avoir

    struct Maison {
        address owner;
    }

    Maison[] public maisons;

    constructor(uint _cost, uint _maxSupply, uint _totalSupply) {
        cost = _cost;
        maxSupply = _maxSupply;
        totalSupply = _totalSupply;

        // Ajouter les maisons initiales au déploiement du contrat
        for (uint i = 0; i < _maxSupply; i++) {
            maisons.push(Maison(address(0)));
        }
    }

    function mint() public payable {
        require(msg.value >= cost, "Montant insuffisant pour minter une maison");
        require(totalSupply < maxSupply, "Plus de maisons disponibles");
        require(maisons[totalSupply].owner == address(0), "Maison deja possedee par un proprietaire");

        maisons[totalSupply].owner = msg.sender;
        totalSupply++;
    }

    function getMaxSupply() public view returns (uint256) {
        return maxSupply;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function getCost() public view returns (uint256) {
        return cost;
    }
}