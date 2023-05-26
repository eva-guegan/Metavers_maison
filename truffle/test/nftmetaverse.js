const MetaverseNFT = artifacts.require('MetaverseNFT');

contract('MetaverseNFT', (accounts) => {
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await MetaverseNFT.new('MetaverseNFT', 'MTN', 100, web3.utils.toWei('0.1', 'ether'));
    });

    it('should mint a new house and assign it to the caller', async () => {
        const cost = await contractInstance.cost();
        await contractInstance.mint({ value: cost });
        const totalSupply = await contractInstance.totalSupply();
        const owner = await contractInstance.ownerOf(totalSupply - 1);

        assert.equal(owner, accounts[0], 'The new house was not assigned to the caller');
    });

    it('should not mint a new house if maximum supply is reached', async () => {
        const maxSupply = await contractInstance.maxSupply();
        const cost = await contractInstance.cost();
        for (let i = 0; i < maxSupply; i++) {
            await contractInstance.mint({ value: cost });
        }

        try {
            await contractInstance.mint({ value: cost });
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert(error.message.includes('Maximum supply reached'), 'Unexpected error message');
        }
    });
});