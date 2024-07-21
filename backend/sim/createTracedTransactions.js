const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const fs = require('fs');

// Load users from JSON file
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Types of materials for the supply chain
const materials = ['gold', 'lithium', 'iron', 'copper'];

async function main() {
    // Connect to the local Substrate node
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });

    // Create a keyring instance
    const keyring = new Keyring({ type: 'sr25519' });

    // Load the users into the keyring
    const keyPairs = users.map(user => {
        try {
            return keyring.addFromUri(user.uri);
        } catch (error) {
            console.error(`Error adding user with URI ${user.uri}:`, error);
            return null;
        }
    }).filter(keyPair => keyPair !== null);

    // Pre-funded account (e.g., Alice)
    const alice = keyring.addFromUri('//Alice');

    // Function to create and sign transactions
    async function createTransaction(from, to, amount, material, nonce) {
        // Custom data with material information
        const transfer = api.tx.balances.transferAllowDeath(to.address, amount);

        const txHash = await transfer.signAndSend(from, { nonce });
        console.log(`Transaction from ${from.address} to ${to.address} for ${amount} of ${material} sent with hash ${txHash}`);
        return txHash;
    }

    // Array to hold the supply chain transactions
    const transactions = [];

    // Example supply chain: Mine -> Supplier -> Apple
    if (keyPairs.length < 3) {
        console.error('Not enough valid key pairs loaded.');
        await api.disconnect();
        return;
    }

    const mine = keyPairs[0];
    const supplier = keyPairs[1];
    const endUser = keyPairs[2];

    // Fetch the current nonce for Alice
    let { nonce } = await api.query.system.account(alice.address);

    // Create transactions in the supply chain
    for (let i = 0; i < materials.length; i++) {
        const material = materials[i];
        const amount = Math.floor(Math.random() * 10) * Math.pow(10, 10); // Random amount

        // Mine to Supplier
        const mineToSupplierTxHash = await createTransaction(mine, supplier, amount, material, nonce);
        nonce = nonce.addn(1);

        // Supplier to Apple
        const supplierToAppleTxHash = await createTransaction(supplier, endUser, amount, material, nonce);
        nonce = nonce.addn(1);

        transactions.push({
            material,
            amount,
            steps: [
                { from: mine.address, to: supplier.address, txHash: mineToSupplierTxHash },
                { from: supplier.address, to: endUser.address, txHash: supplierToAppleTxHash }
            ],
            trace: [mineToSupplierTxHash, supplierToAppleTxHash]
        });
    }

    // Save the transactions to a JSON file
    fs.writeFileSync('transactions.json', JSON.stringify(transactions, null, 2));

    console.log('Transactions saved to transactions.json');

    // Disconnect from the API
    await api.disconnect();
}

main().catch(console.error);
