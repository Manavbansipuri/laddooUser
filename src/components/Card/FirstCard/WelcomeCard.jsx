import React from "react";
import { FaMusic } from "react-icons/fa";
import moustache from "./moustache.png"
import iceCream from "./iceCream.png"
const WelcomeCard = () => {
    return (
        <div className="w-full max-w-[600px] h-[90%] flex flex-col rounded-2xl overflow-hidden relative mx-auto">
            {/* Yellow section */}
            <div className="flex-[0.45] bg-amber-300 flex items-center justify-center rounded-t-2xl overflow-hidden">
                <div className="w-full h-96 bg-amber-300 rounded-lg flex flex-col items-center justify-center shadow-lg">
                    <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
                        <FaMusic className="text-3xl text-amber-300" />
                    </div>
                    <p className="mt-4 text-lg font-bold text-black">THANKS BRO!</p>
                </div>
            </div>

            {/* White section with text */}
            <div className="flex-[0.55] bg-green-400 flex items-center justify-center rounded-t-3xl mt-[-25px]">
                {/* Add custom-scrollbar class and overflow-y-auto for scrolling */}
                <div className="whitespace-normal text-center p-4 w-full h-[280px] overflow-y-auto custom-scrollbar flex flex-col items-center justify-center">
                    <img src={iceCream} alt="moustache" className="w-24" />

                    {/* Styled text inside a rounded pill-like background */}
                    <p className="bg-black text-white text-lg font-mono px-6 py-2 mt-2 cursor-pointer rounded-full">
                        Left Right Left
                    </p>
                </div>
            </div>



            {/* Music Player - Full width with responsive top positioning */}
            {/* <div className="absolute top-[25%] sm:top-[20%] md:top-[25%] lg:top-[20%] xl:top-[20%] right-0 transform flex items-center text-white px-4 p-4 rounded-lg w-full left-20">
                <img
                    src={moustache}
                    alt="moustache"
                    className="w-24"

                />
            </div> */}
        </div>
    );
};

export default WelcomeCard;