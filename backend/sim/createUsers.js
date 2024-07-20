const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const fs = require('fs');
const { randomAsHex } = require('@polkadot/util-crypto');

async function main() {
    // Connect to the local Substrate node
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });

    // Log available modules and methods
    console.log('Available modules:', Object.keys(api.tx));

    // Ensure the balances module is present
    if (!api.tx.balances) {
        console.error('Balances module not found');
        await api.disconnect();
        return;
    }

    // Log available methods in the balances module
    console.log('Available methods in balances module:', Object.keys(api.tx.balances));

    // Create a keyring instance
    const keyring = new Keyring({ type: 'sr25519' });

    // Pre-funded account (e.g., Alice)
    const alice = keyring.addFromUri('//Alice');

    // Fetch the current nonce for Alice
    let { nonce } = await api.query.system.account(alice.address);

    // Number of users to generate
    const NUM_USERS = 10;

    // Array to hold user details
    const users = [];

    for (let i = 0; i < NUM_USERS; i++) {
        // Generate a random pair
        const pair = keyring.addFromUri(randomAsHex(32));
        const { address, meta } = pair;

        // Generate a random amount of DOT to transfer
        const amount = Math.floor(Math.random() * 1000) * Math.pow(10, 10); // Random amount between 0 and 999 DOT

        // Add user details to the array
        users.push({
            address,
            meta,
            uri: pair.uri,
            amount,
        });

        console.log(`Generated user ${i + 1}: ${address} with ${amount / Math.pow(10, 10)} DOT`);

        // Ensure the transferAllowDeath method is available
        if (api.tx.balances.transferAllowDeath) {
            // Transfer the random amount of DOT to the new account
            const transfer = api.tx.balances.transferAllowDeath(address, amount);

            // Sign and send the transaction from Alice with the correct nonce
            const hash = await transfer.signAndSend(alice, { nonce });

            console.log(`Transfer sent with hash ${hash}`);

            // Increment nonce for the next transaction
            nonce = nonce.addn(1);
        } else {
            console.error('transferAllowDeath method not found in balances module');
        }
    }

    // Save user details to a JSON file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    console.log('User details saved to users.json');

    // Disconnect from the API
    await api.disconnect();
}

main().catch(console.error);
