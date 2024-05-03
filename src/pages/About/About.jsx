import React, { useEffect, useState, useRef, useContext } from 'react';
import style from './About.module.css';

import { isMobile } from 'react-device-detect';

import logo from "../../assets/Ziken Labs.png"
import backgroundImage from "../../assets/about_us_background.jpg"
import fabrizioPepe from "../../assets/FabrizioPepe.webp"
import lucaPolo from "../../assets/LucaPolo.webp"
import giordanoAlberti from "../../assets/GiordanoAlberti.jpg"

import fiverrWhiteLogo from "../../assets/fiverrWhiteLogo.svg"
import xWhiteLogo from "../../assets/xLogoWhite.svg"
import linkedinWhiteLogo from "../../assets/linkedInWhiteLogo.svg"

import { CursorContext } from "../../App"
import PixelText from '../../components/PixelText/PixelText';

import { motion } from "framer-motion"


const About = () => {
    const scrollContainer = useRef(null);
    const [ scrollProgress, setScrollProgress ] = useState(0);

	const { cursorEnter, cursorLeave, setCursorColor } = useContext(CursorContext)

    /* useEffect(() => {
		const scrollHandler = e => {
			const scrollPercentage = parseInt(scrollContainer.scrollTop) / parseInt(scrollContainer.scrollHeight) * 100 + 33
			setScrollProgress(scrollPercentage)
        }

        scrollContainer?.current?.addEventListener("scroll", scrollHandler);
        return () => scrollContainer?.current?.removeEventListener("scroll", scrollHandler);
    }, []); */

    const Card = ({ name, description, image, icons }) => {
        return <div className={ `m-8 w-60 h-fit ${style.card} text-black` } onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave }>
            <div className={ `h-fit ${style.cardInner}` }>
                <div className={ `relative h-fit ${style.cardFront} bg-white rounded-lg p-2` } style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                    <div className="absolute w-full h-32 z-10 bg-gray-600 top-0 left-0 rounded-t-lg"></div>
                    <img src={ image } className="rounded-full relative z-20 w-40 h-40 mx-auto mt-10"></img>
                    <p className="relative akashi text-center h-fit mt-4">{ name }</p>
                    <p className="relative text-center text-sm mb-4">{ description }</p>
                </div>
                <div className={ `${style.cardBack} bg-white rounded-lg` } style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                    <img src={ image } className="relative w-full h-auto rounded-t-lg"></img>
                    <p className="relative akashi h-min text-center py-4">{ name }</p>
                    <div className="relative h-fit py-4 w-full grid grid-flow-col justify-center bg-slate-800 rounded-b-lg">
                        { icons.map(({ logo, link, styles }) => <a target="_blank" className="my-auto relative mx-2" href={ link }>
                            <img src={ logo } className={ `relative ${styles ?? "w-8 h-8"}` }></img>
                        </a> )}
                    </div>
                </div>
            </div>
        </div>;
    };

    return (
		<div id="scroll-container" ref={ scrollContainer } style={{ "--scrollbar-color": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) > 60 && Math.trunc(scrollProgress) <= 80)) ? "white" : "black", "--scrollbar-background": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) >= 60 && Math.trunc(scrollProgress) <= 80)) ? "black" : "white" }}
            className="max-h-screen max-w-full overflow-y-scroll overflow-x-hidden scroll-smooth">
            <div id="progress-bar" style={{ width: `${scrollProgress}%`, background: (Math.trunc(scrollProgress) > 33 && Math.trunc(scrollProgress) <= 66) ? "white" : "black" }}></div>
            
			<section>
				{ isMobile ? 
					<nav id="top-nav" className="w-full h-20 px-4 grid z-30" style={{ transition: "top .25s ease" }}>
						<img src={ logo } className="my-auto block h-20 w-20" alt="logo"></img>
					</nav> :
					<nav id="top-nav" className="w-full h-20 px-4 grid z-30" style={{ transition: "top .25s ease" }}>
						<img src={ logo } className="my-auto block h-20 w-20" alt="logo"></img>
						<div></div> { /* Fill space */ }
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave }  href="/services" className="text-center akashi my-auto text font-extrabold mr-5">Services</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/clients" className="text-center akashi my-auto text-black font-bold mx-5">Clients</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/products" className="text-center akashi my-auto text-black font-bold mx-5">Products</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } style={{ textDecorationThickness: "2px", textDecorationStyle: "dotted" }} className="underline underline-offset-4 text-center akashi my-auto text-black font-bold mx-5">About</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/blog" className="text-center akashi my-auto text-black font-bold mx-5">Blog</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/contact" className="text-center akashi my-auto text-black font-bold mx-5">Contact</a>
					</nav> 
				}
                <div className={ `relative h-fit text-white overflow-y-hidden py-4 ${ isMobile ? "px-4" : "px-20" }` }>
                    <img src={ backgroundImage } className="absolute opacity-80 left-0 top-0 w-full h-auto -z-10 blur-sm"></img>
                    <h2 className="akashi text-5xl text-center my-8">Our Vision & Mission</h2>
                    <p className="my-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, orci ut lacinia tristique, neque lorem congue odio, quis viverra metus ligula vitae arcu. Integer nisi lacus, aliquam quis feugiat id, lobortis quis mauris. Donec ultrices tellus ut consectetur pellentesque. Morbi tincidunt libero nec est porta aliquet. Fusce pulvinar suscipit sapien, eget rhoncus odio imperdiet id. Phasellus ultrices, quam eget vehicula pharetra, ligula tortor porta orci, ullamcorper vulputate sapien elit ac diam. Praesent a leo volutpat, sodales lectus quis, iaculis nulla. Curabitur tempus nisl posuere lectus sagittis, a viverra sem finibus. </p>
                </div>
                <div 
                    onMouseEnter={ () => setCursorColor("bg-white") } 
                    onMouseLeave={ () => setCursorColor("bg-black") } className={ `relative text-white bg-black py-4 ${ isMobile ? "px-4" : "px-20" }` }>
                    <h2 className="akashi text-5xl text-center mt-8 mb-16">The team</h2>
                    <div className="flex w-full justify-center">
                        <Card name="Fabrizio Pepe" description="Co-founder of Ziken Labs, architecture student, and travel lover, he is in charge of BesTripTips' editorial team." image={ fabrizioPepe } icons={ [ { logo: linkedinWhiteLogo, link: "https://www.linkedin.com/in/fabrizio-pepe/" }, { logo: xWhiteLogo, link: "https://twitter.com/digital_fp_", styles: "w-6 h-6 mt-1" } ] } />
                        <Card name="Luca Polo" description="Co-founder of Ziken Labs, experienced graphic designer, he merges creativity, technology and innovation." image={ lucaPolo } icons={ [ { logo: linkedinWhiteLogo, link: "https://www.linkedin.com/in/luca-polo/" }, { logo: xWhiteLogo, link: "https://twitter.com/ElrondLuis", styles: "w-6 h-6 mt-1" } ] } />
                        <Card name="Giordano Alberti" description="Collaborator of Ziken Labs, computer engineering student and developer, He's a constant learner, honing his coding skills" image={ giordanoAlberti } icons={ [ { logo: linkedinWhiteLogo, link: "https://www.linkedin.com/in/giordano-alberti-39842627b/" }, { logo: fiverrWhiteLogo, link: "https://it.fiverr.com/users/asvirtual1", styles: "w-6 h-6 mt-1" } ] } />
                    </div>
                </div>
			</section>
        </div>     
    );

    /* return <main className={ style.main }>
        <h1>
            Founded in 2023 in Italy by industry visionaries <a href="https://www.linkedin.com/in/fabrizio-pepe/" target="_blank">Fabrizio Pepe</a> and <a href="https://www.linkedin.com/in/luca-polo/" target="_blank">Luca Polo</a>, Ziken Labs is a premium digital services agency that distinguishes itself through a commitment to innovation and proficiency. <br></br>
            Our core principles of delivering unparalleled quality, speed, and efficiency guide every facet of our operations. Offering a comprehensive suite of solutions, including: 
        </h1>
        <ul>
            <li>Project Management</li>
            <li>Team Building</li>
            <li>SEO Strategies</li>
            <li>SEO Copywriting</li>
            <li>Graphic Design</li>
            <li>Digital Marketing</li>
            <li>Website Building</li>
            <li>Workflow Improvement through AI</li>
            <li>Bot and Software Development</li>
            <li>Blockchain Development</li>
            <li>Smart Contract Development</li>
        </ul>
        <h3>
            We are the preferred partner for clients like <a href="https://trakx.io/" target="_blank">Trakx</a>, <a href="https://plasbit.com/" target="_blank">PlasBit</a>, <a href="https://www.spaziocrypto.com/" target="_blank">Spaziocrypto</a>, and <a href="https://evoload.co/" target="_blank">Evoload</a>. We are also honored to have reached over 100 orders and achieved level 2 on <a href="https://www.fiverr.com/pp_studios" target="_blank">our Fiverr profile</a>!<br></br>
            Join us at Ziken Labs, where we transform visionary aspirations into tangible and prosperous realities, epitomizing the pinnacle of digital success.<br></br>
            We have been featured on:<br></br>
        </h3>
        <ul>
            <li><a href="https://techbullion.com/ziken-labs-artificial-intelligence-ai-in-digital-marketing/" target="_blank">techbullion.com</a></li>
            <li><a href="https://ventsmagazine.com/2023/11/22/ziken-labs-marketing-6-0-communities-and-word-of-mouth/" target="_blank">ventsmagazine.com</a></li>
            <li><a href="https://theinscribermag.com/ziken-labs-11-tips-to-work-smarter-not-harder/" target="_blank">theinscribermag.com</a></li>
            <li><a href="https://techsslash.com/ziken-labs-a-brand-integrity-case-study/" target="_blank">techsslash.com</a></li>
            <li><a href="https://entrepreneursbreak.com/the-seo-journey-of-ziken-labs-unlocking-success.html" target="_blank">entrepreneursbreak.com</a></li>
            <li><a href="https://techsslash.com/ziken-labs-project-planning/" target="_blank">techsslash.co</a></li>
            <li><a href="https://greenrecord.co.uk/ziken-labs-leveraging-co-marketing-opportunities/" target="_blank">greenrecord.co.uk</a></li>
            <li><a href="https://metapress.com/metaverse-and-business-analysis-ziken-labs/" target="_blank">metapress.com</a></li>
            <li><a href="https://www.digitaljournal.com/pr/news/cdn-newswire/ziken-labs-guide-building-a-successful-brand" target="_blank">digitaljournal.com</a></li>
            <li><a href="https://www.arnewsjournal.com/business/web3-impact-ziken-labs-analysis/" target="_blank">arnewsjournal.com</a></li>
            <li><a href="https://www.benzinga.com/pressreleases/23/12/36394979/ziken-labs-exploring-digital-marketing-strategies-for-2024/" target="_blank">bezinga.com</a></li>
            <li><a href="https://www.yadaontheblock.com/post/will-crypto-replace-cash-ziken-labs-analysis" target="_blank">yadaontheblock.com</a></li>
            <li><a href="https://www.bignewsnetwork.com/news/274078147/ziken-labs-guide-to-building-a-successful-branding-firm" target="_blank">bignewsnetwork.com</a></li>
            <li><a href="https://artdaily.com/news/165545/Exploring-Visual-Identity-With-Ziken-Labs" target="_blank">artdaily.com</a></li>
            <li><a href="https://www.trameetech.it/innovazione/ia-nel-branding-ziken-labs/" target="_blank">trameetech.it</a></li>
            <li><a href="https://www.tuttotek.it/web-social/speciali-web-social/creare-blog-di-successo-ziken-labs-guida" target="_blank">tuttotek.it</a></li>
            <li><a href="https://techscopeworld.com/blockchain-inclusiveness-ziken-labs-analysis/" target="_blank">techscopeworld.com</a></li>
            <li><a href="https://socialandtech.net/marketing-nel-web3-lanalisi-di-ziken-labs/" target="_blank">socialandtech.net</a></li>
            <li><a href="https://www.ukinsider.co.uk/business/competitor-analysis-ziken-labs-tips-strategies/" target="_blank">ukinsider.co.uk</a></li>
            <li><a href="https://www.worthview.com/the-importance-of-kpis-tracking-for-ziken-labs/" target="_blank">worthview.com</a></li>
            <li><a href="https://www.soup.io/pareto-principle-ziken-labs-case-study" target="_blank">soup.io</a></li>
            <li><a href="https://sortlist.com" target="_blank">sortlist.com</a></li>
            <li><a href="https://clutch.co" target="_blank">clutch.co</a></li>
            <li><a href="https://topinteractiveagencies.com" target="_blank">topinteractiveagencies.com</a></li>
            <li><a href="https://agencyvista.com" target="_blank">agencyvista.com</a></li>
            <li><a href="https://designrush.com" target="_blank">designrush.com</a></li>
            <li><a href="https://virgilio.it" target="_blank">virgilio.it</a></li>
            <li><a href="https://paginegialle.it" target="_blank">paginegialle.it</a></li>
        </ul>
    </main>; */
};

export default About;
