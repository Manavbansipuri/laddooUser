import React from 'react';
import "./Loading.css";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;