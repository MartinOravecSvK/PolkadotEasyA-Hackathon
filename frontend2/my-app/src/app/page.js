'use client';
import Web3 from 'web3';
import { useState } from 'react';
const providerRPC = {
  moonbase: 'https://rpc.api.moonbase.moonbeam.network',
};
const web3 = new Web3(providerRPC.moonbase);
export const getBalance = async (address) => {
  const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
  return balance;
};
export default function Home() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const handleFetchBalance = async () => {
    const balance = await getBalance(address);
    setBalance(balance);
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1>Web3 Balance Checker</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginRight: '10px', color: 'black' }}
        />
      </div>
      <button onClick={handleFetchBalance} className="mt-60">Get Balance</button>
      {balance && (
        <div>
          <p>The balance of {address} is: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}
