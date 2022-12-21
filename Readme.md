# My Chain
In this project I have created a blockchain and cryptocurrency from scratch. I use NodeJS to implement this project.

In this implementation I have use main blockchain concepts like **Proof-of-Work, mining, peer-to-peer connections, etc**.
Created a NodeJS application with real-time websocket connections. which created an **API** with NodeJS and Express for my blockchain.

### Project mainly contain following:
- Build a Blockchain in the object-oriented programming style.
- Generate hashes for blocks in the chain.
- Unit Test Components of the Blockchain.
- Create an API around the Blockchain.
- Create a real-time connected peer-to-peer server.
- Implement a proof-of-work algorithm.
- Sign Transactions with cryptography and digital signature.
- Create a Transaction Pool for a real-time list of incoming data.
- Include transactions in core blocks of the chain.

## Project structure

> **app folder** - contains the application logic for blockchain.

- **index.js** - blockchain logic with API's. 

    *Note* : You can call this api using your localhost. execute command `npm run dev`. Then the API will be available on port 3001. whereas the port no 5001 will be used for websocket to cummunicate with other blockchain nodes. 

- **p2p-server.js** - P2pServer code which contain websocket to connect with other blockcahin nodes and sync blockcahin over all connected nodes. 

> **blockchain folder** - contains the logic for blocks and blockchain.

- **block.js** - basic logic for block in the blockchain. 

- **block.test.js** - The test script that used for testing the Block module in block.js.

- **index.js** - basic logic for blockchain containing the chain of blocks. 

- **index.test.js** - The test script that used for testing the Blockchain module in index.js.

> **wallet folder** - contains the logic for wallet, transaction and transaction pools.

- **index.js** - basic logic for wallet. 

- **index.test.js** - The test script that used for testing the Wallet module in index.js.

- **transaction.js** - basic logic for transaction. 

- **transaction.test.js** - The test script that used for testing the Transaction module in transaction.js.

- **transaction-pool.js** - basic logic for transaction-pool. 

- **transaction-pool.test.js** - The test script that used for testing the TransactionPool module in transaction-pool.js.


> **chain-util.js** - contains the chain-util class which has useful functions for blockchain.

> **config.js** - contains the constants or global variable used in blockchain.

> **dev-test.js** - contains the development script for testing.

## Commands

### to execute all test scripts
`npm run test`

### to execute all test scripts in dev-test.js file.
`npm run dev-test`

### to start blockchain node
- initial node (first node) 
    
    `npm run dev`

- second node
    
    `HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev`

    *Note* - here we specify,

    HTTP_PORT=3002 to select different port no for api.  
    P2P_PORT=5002 to select differnt webscoket port no
    PEERS=ws://localhost:5001 to connect to previous node.

- similarly, for third node
    
    `HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev`

    *Note* - here we specify,

    HTTP_PORT=3002 to select different port no for api.  
    P2P_PORT=5002 to select differnt webscoket port no
    PEERS=ws://localhost:5001,ws://localhost:5002 to connect to previous two node.

***Note***-`npm run start` works similar to `npm run dev`. Difference is that dev will execute app with **nodemon** and start will execute app with **node**. 
