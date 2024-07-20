import React from "react";

const Footer = () => (
    <div className="w-full flex flex-col p-8">
        <div className="w-full flex flex-col md:flex-row justify-between items-start px-16 my-8 mt-48">
            <div className="flex flex-col mb-6 md:mb-0">
                <h4 className="text-white font-bold mb-2">ECOSYSTEM</h4>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Community</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Jobs</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Wallets</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Dapps</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Brand Hub</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Telemetry</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Treasury</a>
            </div>
            <div className="flex flex-col mb-6 md:mb-0">
                <h4 className="text-white font-bold mb-2">FEATURES</h4>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Technology</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Blockspace</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">DOT token</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Staking</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Parachains</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">System parachains</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">XCM</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Auctions</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">OpenGov</a>
            </div>
            <div className="flex flex-col mb-6 md:mb-0">
                <h4 className="text-white font-bold mb-2">DEVELOPMENT</h4>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Documentation</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Grants</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Bounties</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Blockchain Academy</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Build</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Substrate</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Alpha Program</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">PK Bridge Bounty</a>
            </div>
            <div className="flex flex-col">
                <h4 className="text-white font-bold mb-2">ABOUT</h4>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">About Polkadot</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Blog</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Newsroom</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Roadmap</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Whitepaper</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Wiki</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">FAQ</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Support</a>
                <a href="#" className="text-black text-base mb-1 cursor-pointer">Contact</a>
            </div>
        </div>

        <div className="flex justify-center items-center flex-col mt-8">
            <h4 className="text-white font-bold mb-2">NEWSLETTER</h4>
            <p className="text-black text-base mb-4">Subscribe to the newsletter to hear about Polkadot updates and events.</p>
            <button className="px-6 py-2 bg-pink hover:bg-hoverPink rounded-md text-white font-medium">Subscribe</button>
        </div>

        <div className="w-full h-[0.25px] bg-gray-400 my-8" />

        <div className="flex justify-between items-center w-full mt-8">
            <p className="text-black text-xs">© 2024 Web3 Foundation</p>
            <div className="flex space-x-4">
                <a href="#" className="text-black text-xs">Legal Disclosures</a>
                <a href="#" className="text-black text-xs">Disclaimer</a>
                <a href="#" className="text-black text-xs">Privacy</a>
                <a href="#" className="text-black text-xs">Manage Cookies</a>
            </div>
        </div>


    </div>
);

export default Footer;
