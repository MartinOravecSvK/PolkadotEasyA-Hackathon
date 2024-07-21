const { ApiPromise, WsProvider } = require('@polkadot/api');
const fs = require('fs');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

app.get('/api/transactions', async (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, './sim/users.json'), 'utf8'));
        const userAddresses = users.map(user => user.address);

        // Connect to the Polkadot node
        const wsProvider = new WsProvider('ws://127.0.0.1:9944');
        const api = await ApiPromise.create({ provider: wsProvider });

        // Get the latest block number
        const latestHeader = await api.rpc.chain.getHeader();
        const latestBlockNumber = latestHeader.number.toNumber();
        console.log(`Latest block number: ${latestBlockNumber}`);

        // Specify the number of blocks to fetch
        const numBlocks = 200;

        // Array to store transactions
        const transactions = [];

        // Fetch and collect transactions from the latest blocks
        for (let i = 0; i < numBlocks; i++) {
            const blockNumber = latestBlockNumber - i;
            if (blockNumber < 0) break; // Prevent fetching negative block numbers

            const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
            const signedBlock = await api.rpc.chain.getBlock(blockHash);

            signedBlock.block.extrinsics.forEach((extrinsic, index) => {
                transactions.push({
                    blockNumber,
                    blockHash: blockHash.toHex(),
                    transactionIndex: index + 1,
                    method: `${extrinsic.method.section}.${extrinsic.method.method}`,
                    signer: extrinsic.signer.toString(),
                    nonce: extrinsic.nonce.toString(),
                    hash: extrinsic.hash.toHex()
                });
            });
        }

        // Disconnect from the API
        await api.disconnect();

        // Return the transactions as JSON
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
