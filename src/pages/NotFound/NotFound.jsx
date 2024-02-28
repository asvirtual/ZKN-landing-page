import React from 'react';

import animation404 from '../../assets/404_animation.json';
import Lottie from 'lottie-react';


export default function NotFound() {
    return <>
        <Lottie lottieRef={ animation404 } style={{ height: "70vh" }} animationData={ animation404 } loop={ true } autoplay={ true } />
        <h4 className="text-center font-extrabold text-3xl mt-12">Ooops, seems like you followed a broken link :/</h4>
    </>;
}
