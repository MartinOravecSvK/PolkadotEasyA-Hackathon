const { ApiPromise, WsProvider } = require('@polkadot/api');
const fs = require('fs');

async function main() {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
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

    let indexF = 0;
    
    // Fetch and print transactions from the latest blocks
    for (let i = 0; i < numBlocks; i++) {
        const blockNumber = latestBlockNumber - i;
        if (blockNumber < 0) break; // Prevent fetching negative block numbers

        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);

        signedBlock.block.extrinsics.forEach((extrinsic, index) => {
            const signer = extrinsic.signer.toString();
            // if (userAddresses.includes(signer)) {
                console.log(`\nBlock number: ${blockNumber}`);
                console.log(`Block hash: ${blockHash}`);
                
                console.log(`\nTransaction ${index + 1}:`);
                console.log(`\nFull index: ${indexF}`)
                console.log(`Method: ${extrinsic.method.section}.${extrinsic.method.method}`);
                console.log(`Signer: ${signer}`);
                console.log(`Nonce: ${extrinsic.nonce.toString()}`);
                console.log(`Hash: ${extrinsic.hash.toHex()}`);
                indexF++;
                // }
        });
    }

    // Disconnect from the API
    await api.disconnect();
}

main().catch(console.error);
