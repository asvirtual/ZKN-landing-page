import React from 'react';

import Lottie from "lottie-react";

import workInProgressAnimation from "../../assets/work_in_progress.json";
import xLogo from "../../assets/xLogo.png";
import discordLogo from "../../assets/discordLogo.svg";
import gmailLogo from "../../assets/gmailLogo.svg";


export default function Temp() {
    return <>
        <Lottie lottieRef={ workInProgressAnimation } style={{ height: "70vh" }} animationData={ workInProgressAnimation } loop={ true } autoplay={ true } />
        <h1 className="text-center akashi text-3xl mt-6 mb-10">Contact us:</h1>
        <div className="flex justify-center mt-4">
            <a href="https://twitter.com/ZikenLabs" target="_blank"><img src={ xLogo } className="w-16 h-16 rounded-full bg-black p-2 hover:scale-110 transition-all"></img></a>
            <a href="https://discord.gg/kYn7jkRemT" target="_blank"><img src={ discordLogo } className="w-16 h-16 ml-4 hover:scale-110 transition-all"></img></a>
            <a href="mailto:info@zikenlabs.com" target="_blank"><img src={ gmailLogo } className="w-16 h-16 ml-4 hover:scale-110 transition-all"></img></a>
        </div>
    </>;
};
