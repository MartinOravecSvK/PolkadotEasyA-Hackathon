'use client';
import Web3 from 'web3';
import { useState } from 'react';
import { Navbar, Transactions } from './components';
import { Footer } from './components';
import { Welcome } from './components';


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
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
    </div>
        <Welcome />
    <Transactions />
    <Footer />
    </div>
  );
}
