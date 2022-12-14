const Blockchain = require("./index");
const Block = require("./block");


describe("Blockchain", () => {

    let mychain, mychain2;

    beforeEach(() => {
        mychain = new Blockchain();
        mychain2 = new Blockchain();
    });

    it('start the genesis block', () => {
        expect(mychain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = "foo";
        mychain.addBlock(data);

        expect(mychain.chain[mychain.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        mychain2.addBlock('foo');
        expect(mychain.isValidChain(mychain2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        mychain2.chain[0].data = 'Bad data';
        expect(mychain.isValidChain(mychain2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        mychain2.addBlock('foo');
        mychain2.chain[1].data = 'Not foo';
        expect(mychain.isValidChain(mychain2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        mychain2.addBlock('goo');
        mychain.replaceChain(mychain2.chain);
        expect(mychain.chain).toEqual(mychain2.chain);
    });

    it('does not replace the chain with one of less than or equal length', () => {
        mychain.addBlock('foo');
        mychain.replaceChain(mychain2.chain);
        expect(mychain.chain).not.toEqual(mychain2.chain);
    });

});