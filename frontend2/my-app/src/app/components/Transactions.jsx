import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';

import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionModal = ({ open, handleClose, data }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <Modal open={open}>
      <>
      <Box sx={{ 
        width: 800, 
        maxHeight: '80vh', 
        overflowY: 'auto', 
        bgcolor: '#2c2c2c', 
        color: 'white', 
        margin: 'auto', 
        marginTop: '5%', 
        padding: 4,
        borderRadius: 2,
        boxShadow: 24,
        outline: 'none'
      }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>Transactions</Typography>
        <List>
          {data && data.map((transaction, index) => (
            <React.Fragment key={transaction.hash}>
              <ListItem button onClick={() => handleListItemClick(index)} sx={{ bgcolor: '#3c3c3c', marginBottom: 1, borderRadius: 1 }}>
                <ListItemText primary={transaction.hash} />
              </ListItem>
              {selectedIndex === index && (
                <Box sx={{ paddingLeft: 2, paddingBottom: 2, bgcolor: '#3c3c3c', borderRadius: 1, marginBottom: 1 }}>
                  <Typography>Block Hash: {transaction.blockHash}</Typography>
                  <Typography>Block Number: {transaction.blockNumber}</Typography>
                  <Typography>Method: {transaction.method}</Typography>
                  <Typography>Nonce: {transaction.nonce}</Typography>
                  <Typography>Signer: {transaction.signer}</Typography>
                  <Typography>Transaction Index: {transaction.transactionIndex}</Typography>
                </Box>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Button onClick={handleClose} sx={{ marginTop: 2, bgcolor: '#3c3c3c', color: 'white', ':hover': { bgcolor: '#5c5c5c' }, marginLeft: '1050px', scale: 4 }}>
        Close 
      </Button>
      </>
    </Modal>
  );
};

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    if (loading || data) {
      handleOpen();
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      console.log('Fetched data:', response.data);  // Debugging: log fetched data
      setData(response.data);
      setError(null);
      handleOpen();
    } catch (err) {
      console.error('Error fetching data:', err);  // Debugging: log error
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  let srcImg;
  if (message === "GOLD") {
    srcImg = "/gold.png";
  } else if (message === "DIAMOND") {
    srcImg = "/diamond.png";
  } else if (message === "RUBY") {
    srcImg = "/ruby.png";
  } else if (message === "EMERALD") {
    srcImg = "/emerald.png";
  } else if (message === "IRON") {
    srcImg = "/iron.png";
  } else if (message === "OIL") {
    srcImg = "/oil.png";
  } else {
    srcImg = "";
  }

  return (
    <div className="bg-pink m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
      onClick={fetchData}
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} DOT</p>
        </div>
        <img
          src={srcImg}
          alt="nature"
          className="h-32 2xl:h-96 rounded-md object-cover mb-8"
        />
        <div className="bg-hoverPink p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl ">
          <p className="text-white font-bold ">{timestamp}</p>
        </div>
      </div>
      <TransactionModal open={open} handleClose={handleClose} data={data} />
    </div>
  );
};

const Transactions = () => {
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          Connect your account to see the latest transactions
        </h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
