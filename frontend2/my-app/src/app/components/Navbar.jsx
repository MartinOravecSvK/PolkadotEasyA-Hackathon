import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";

const NavBarItem = ({ title, classprops }) => (
    <li className={`mx-4 cursor-pointer ${classprops}`}>
        {title} <AiOutlineDown className="inline ml-2" />
    </li>
);

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);

    return (
        <nav className="w-full flex md:justify-start justify-between items-center p-4">
            <div className="md:flex-[0.85] flex-initial justify-center items-center ml-16">
                <div className="flex items-center space-x-4">
                    <img src="./NPM-2.png" alt="logo" className="w-16 h-16 cursor-pointer" />
                </div>
            </div>

            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Ecosystem", "Features", "Development", "About"].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                ))}
                <li className="bg-pink py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-hoverPink">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                )}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
                        {["Ecosystem", "Features", "Development", "About"].map(
                            (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
