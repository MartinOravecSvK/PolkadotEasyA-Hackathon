import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };


    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col md:flex-row items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                    </p>
                    <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-pink p-3 rounded-full cursor-pointer hover:bg-hoverPink"
                    >
                        <AiFillPlayCircle className="text-white mr-2 " />
                        <p className="text-white text-base font-semibold">
                            Connect Wallet
                        </p>
                    </button>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mt-10 md:mt-0 bg-[#ead5d1] rounded-lg" >
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism rounded-lg">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={()=>{}} />
                        <Input placeholder="Amount (DOT)" name="amount" type="number" handleChange={()=>{}} />
                        <Input placeholder="Resource" name="keyword" type="text" handleChange={()=>{}} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={()=>{}} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        <button
                            type="button"
                            onClick={()=>{}}
                            className="text-white w-full mt-2 bg-pink border-[1px] p-2 border-[#7b506f] hover:bg-hoverPink  rounded-full cursor-pointer"
                        >
                            Send now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
