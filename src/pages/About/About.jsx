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
import discordLogo from "../../assets/discordLogo.svg"
import linkedinWhiteLogo from "../../assets/linkedInWhiteLogo.svg"

import bestTripTipsLogo from "../../assets/BesTripTips.svg"
import evoloadLogo from "../../assets/Evoload.svg"
import fiverrLogo from "../../assets/Fiverr.svg"
import newsFromTechLogo from "../../assets/NewsFromTech.svg"
import nextIdeaLogo from "../../assets/Next idea.svg"
import nextToolLogo from "../../assets/Next Tool.svg"
import plasbitLogo from "../../assets/Plasbit.svg"
import spazioCryptoLogo from "../../assets/Spaziocrypto.svg"
import trackerXLogo from "../../assets/TrackerX.svg"
import trakXLogo from "../../assets/Trakx.svg"
import votexLogo from "../../assets/Votex.svg"
import crpytoStocksLogo from "../../assets/Crypto&Stocks.svg"
import finzenLogo from "../../assets/Finzen.svg"

import { CursorContext } from "../../App"
import PixelText from '../../components/PixelText/PixelText';

import { motion } from "framer-motion"

import Marquee from 'react-fast-marquee';


const Card = ({ cursorEnter, cursorLeave, name, role, description, image, icons }) => {
    return <div className={ `hover:-mt-1 m-8 w-72 h-fit ${style.card} text-black` } onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave }>
        <div className={ `h-fit ${style.cardInner}` }>
            <div className={ `relative h-fit ${style.cardFront} bg-white rounded-lg p-6` } style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                <div className="absolute w-full h-32 z-10 bg-gray-600 top-0 left-0 rounded-t-lg"></div>
                <img src={ image } className="rounded-full relative z-20 w-40 h-40 mx-auto mt-10"></img>
                <p className="relative akashi text-center h-fit mt-4 text-lg">{ name }</p>
                <p className="relative akashi text-center h-fit text-xs">{ role }</p>
                <p className="relative text-center text-md mt-4 mb-4">{ description }</p>
            </div>
            <div className={ `${style.cardBack} bg-white rounded-lg` } style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                <img src={ image } className={ `${style.cardBackImage} relative w-full h-auto` }></img>
                <p className="relative akashi h-min text-center pt-4 text-lg">{ name }</p>
                <p className="relative akashi text-center h-fit pb-14 text-xs">{ role }</p>
                <div className="relative h-fit py-4 w-full grid grid-flow-col justify-center bg-slate-800 rounded-b-lg">
                    { icons.map(({ logo, link, styles }) => <a target="_blank" className="my-auto relative mx-2" href={ link }>
                        <img src={ logo } className={ `relative ${styles ?? "w-8 h-8"}` }></img>
                    </a> )}
                </div>
            </div>
        </div>
    </div>;
};

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

    return (
		<div id="scroll-container" ref={ scrollContainer } style={{ "--scrollbar-color": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) > 60 && Math.trunc(scrollProgress) <= 80)) ? "white" : "black", "--scrollbar-background": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) >= 60 && Math.trunc(scrollProgress) <= 80)) ? "black" : "white" }}
            className="max-h-screen max-w-full overflow-y-scroll overflow-x-hidden scroll-smooth">
            <div id="progress-bar" style={{ width: `${scrollProgress}%`, background: (Math.trunc(scrollProgress) > 33 && Math.trunc(scrollProgress) <= 66) ? "white" : "black" }}></div>
            
			<section>
				{ isMobile ? 
					<nav id="top-nav" className="w-full h-20 px-4 grid z-30" style={{ transition: "top .25s ease" }}>
						<img src={ logo } className="my-auto block h-20 w-20" alt="logo" onClick={ () => window.location.href = "/" }></img>
					</nav> :
					<nav id="top-nav" className="w-full h-20 px-4 grid z-30" style={{ transition: "top .25s ease" }}>
						<img src={ logo } className="my-auto block h-20 w-20" alt="logo" onClick={ () => window.location.href = "/" }></img>
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
                        <Card cursorEnter={ cursorEnter } cursorLeave={ cursorLeave } name="Fabrizio Pepe" role="Co-founder" description="Co-founder & CEO of Ziken Labs. Focused on entrepreneurial activities, he wants to make the company an international reality." image={ fabrizioPepe } icons={ [ { logo: linkedinWhiteLogo, link: "https://www.linkedin.com/in/fabrizio-pepe/" }, { logo: xWhiteLogo, link: "https://twitter.com/digital_fp_", styles: "w-6 h-6 mt-1" } ] } />
                        <Card cursorEnter={ cursorEnter } cursorLeave={ cursorLeave } name="Luca Polo" role="Co-founder" description="Co-founder of Ziken Labs, experienced graphic designer, he merges creativity, technology and innovation." image={ lucaPolo } icons={ [ { logo: linkedinWhiteLogo, link: "https://www.linkedin.com/in/luca-polo/" }, { logo: xWhiteLogo, link: "https://twitter.com/ElrondLuis", styles: "w-6 h-6 mt-1" } ] } />
                        <Card cursorEnter={ cursorEnter } cursorLeave={ cursorLeave } name="Giordano Alberti" role="Website developer" description="Collaborator of Ziken Labs, tech enthusiast, computer engineering student and developer, he's a constant learner, honing his coding skills" image={ giordanoAlberti } icons={ [ { logo: linkedinWhiteLogo, link: "https://www.linkedin.com/in/giordano-alberti-39842627b/" }, { logo: fiverrWhiteLogo, link: "https://it.fiverr.com/users/asvirtual1", styles: "w-6 h-6 mt-1" } ] } />
                    </div>
                    <div className="grid grid-flow-col gap-12 w-full justify-center px-12 my-12">
                        <div>
                            <img src={ xWhiteLogo } className="w-12 h-12 mx-auto rounded-full bg-red-700 p-3"></img>
                            <h3 className="akashi text-center text-2xl my-4">Piani strategici</h3>
                            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, orci ut lacinia tristique, neque lorem congue odio, quis viverra metus ligula vitae arcu. </p>
                        </div>
                        <div>
                            <img src={ xWhiteLogo } className="w-12 h-12 mx-auto rounded-full bg-red-700 p-3"></img>
                            <h3 className="akashi text-center text-2xl my-4">Customized solutions</h3>
                            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, orci ut lacinia tristique, neque lorem congue odio, quis viverra metus ligula vitae arcu. </p>
                        </div>
                        <div>
                            <img src={ xWhiteLogo } className="w-12 h-12 mx-auto rounded-full bg-red-700 p-3"></img>
                            <h3 className="akashi text-center text-2xl my-4">Costanza e resilienza</h3>
                            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, orci ut lacinia tristique, neque lorem congue odio, quis viverra metus ligula vitae arcu. </p>
                        </div>
                        <div>
                            <img src={ xWhiteLogo } className="w-12 h-12 mx-auto rounded-full bg-red-700 p-3"></img>
                            <h3 className="akashi text-center text-2xl my-4">Critical Thinking</h3>
                            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, orci ut lacinia tristique, neque lorem congue odio, quis viverra metus ligula vitae arcu. </p>
                        </div>
                    </div>
                    <div className="mt-32 mb-12 px-100">
                        <h2 className="akashi text-center text-5xl mb-4">Like our project?</h2>
                        <p className="mx-auto text-center w-96">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, orci ut lacinia tristique, neque lorem congue odio, quis viverra metus ligula vitae arcu. </p>
                    </div>
                    <div className={ `relative h-fit overflow-y-hidden py-4 ${ isMobile ? "px-4" : "px-20" } flex mx-auto w-fit bg-slate-600 rounded-lg mb-8` }>
                        <img src={ discordLogo } className="w-12 h-12"></img>
                        <p className="akashi my-auto ml-4 text-xl">Join us on Discord!</p>
                    </div>
                </div>
                <div className="mt-8 px-40">
                    <h2 className="akashi text-center text-5xl">OUR CLIENTS</h2>
                    <Marquee autoFill={ true } pauseOnHover={ true } speed={ 75 } gradient={ true } className=" mt-5 mb-24">
                        <div className="flex justify-center bg-slate-300 py-8">
                            <div className="flex mx-20">
                                <img src={ trakXLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">TrakX</p>
                            </div>
                            <div className="flex mx-20">
                                <img src={ plasbitLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">PlasBit</p>
                            </div>
                            <div className="flex mx-20">
                                <img src={ evoloadLogo } className="w-16 h-16"></img>
                                <h4 className="my-auto text-xl">Evoload</h4>
                            </div>
                            <div className="flex mx-20">
                                <img src={ spazioCryptoLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">SpazioCrypto</p>
                            </div>
                        </div>
                    </Marquee>
                    
                    <h2 className="akashi text-center text-5xl">OUR PRODUCTS</h2>
                    <Marquee autoFill={ true } pauseOnHover={ true } speed={ 75 } gradient={ true } className=" mt-5 mb-24">
                        <div className="flex justify-center bg-slate-300 py-8">
                            <div className="flex mx-20">
                                <img src={ bestTripTipsLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">BesTripTips</p>
                            </div>
                            <div className="flex mx-20">
                                <img src={ newsFromTechLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">NewsFromTech</p>
                            </div>
                            <div className="flex mx-20">
                                <img src={ finzenLogo } className="w-16 h-16"></img>
                                <h4 className="my-auto text-xl">TheFinzen</h4>
                            </div>
                            <div className="flex mx-20">
                                <img src={ votexLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">Votex</p>
                            </div>    
                            <div className="flex mx-20">
                                <img src={ trackerXLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">TrackerX</p>
                            </div>    
                            <div className="flex mx-20">
                                <img src={ crpytoStocksLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">CryptoStocks</p>
                            </div>                            
                        </div>
                    </Marquee>
                    <h2 className="akashi text-center text-5xl">FEATURED ON</h2>
                    <Marquee autoFill={ true } pauseOnHover={ true } speed={ 75 } gradient={ true } className=" mt-5 mb-24">
                        <div className="flex justify-center bg-slate-300 py-8">
                            <div className="flex mx-20">
                                <img src={ bestTripTipsLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">BesTripTips</p>
                            </div>
                            <div className="flex mx-20">
                                <img src={ newsFromTechLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">NewsFromTech</p>
                            </div>
                            <div className="flex mx-20">
                                <img src={ finzenLogo } className="w-16 h-16"></img>
                                <h4 className="my-auto text-xl">TheFinzen</h4>
                            </div>
                            <div className="flex mx-20">
                                <img src={ votexLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">Votex</p>
                            </div>    
                            <div className="flex mx-20">
                                <img src={ trackerXLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">TrackerX</p>
                            </div>    
                            <div className="flex mx-20">
                                <img src={ crpytoStocksLogo } className="w-16 h-16"></img>
                                <p className="my-auto text-xl">CryptoStocks</p>
                            </div>                            
                        </div>
                    </Marquee>
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
