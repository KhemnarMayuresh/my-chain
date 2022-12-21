/* Test mining of block */
// const Block = require('./block');

// // const block = new Block("foo","bar","zoo","baz");
// // console.log(block.toString());
// // console.log(Block.genesis().toString());

// const fooBlock = Block.mineBlock(Block.genesis(),"foo");
// console.log(fooBlock.toString());

/* Test mining of block with difficulty adjustment */
// const Blockchain = require("./blockchain");

// const bc = new Blockchain();

// for (let i=0; i<10; i++) {
//     console.log(bc.addBlock(`foo ${i}`).toString());
// }

/* Test wallet part */
const Wallet = require("./wallet");

const wallet = new Wallet();
console.log(wallet.toString());