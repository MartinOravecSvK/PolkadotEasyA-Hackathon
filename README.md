# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
<img width="382" alt="Screenshot 2024-07-20 at 17 51 13" src="https://github.com/user-attachments/assets/973d6798-eb3f-4633-bcb3-0f7e8ef5ad35">

# Run Substrate Node (locally)

Prerequisites:
 - Install Rust (https://rustup.rs/)

Get into correct directory:

```
cd backend/substrate-node
```

Build the node:
```
cargo build --release
```

Run the node locally:
```
./target/release/node-template --dev
```
