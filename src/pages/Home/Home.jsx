import { useEffect, useState, useRef, useContext } from 'react'

import PixelText from '../../components/PixelText/PixelText'
import About from '../About/About'

import * as THREE from "three"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger" 
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { motion } from 'framer-motion'

import { isMobile } from 'react-device-detect';

import Lottie from "lottie-react";
import projectManagementAnimation from "../../assets/project_management.json"
import graphicDesignAnimation from "../../assets/graphic_design.json"
import copywritingAnimation from "../../assets/copywriting.json"
import webDesignAnimation from "../../assets/web_design.json"
import marketingAnimation from "../../assets/marketing.json"
import businessConsultingAnimation from "../../assets/business_consulting.json"
import workInProgressAnimaation from "../../assets/work_in_progress.json"

import xLogo from "../../assets/xLogo.png"
import xWhiteLogo from "../../assets/xLogoWhite.svg"
import discordLogo from "../../assets/discordLogo.svg"
import discordWhiteLogo from "../../assets/discordWhiteLogo.svg"
import gmailLogo from "../../assets/gmailLogo.svg"
import linkedinWhiteLogo from "../../assets/linkedInWhiteLogo.svg"
import instagramWhiteLogo from "../../assets/instagramWhiteLogo.svg"
import dot from "../../assets/dot.png"
import logo from "../../assets/Ziken Labs.png"

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

import { CursorContext } from "../../App"


gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({
	immediateRender: false,
	ease: "power1.inOut",
	scrub: true
});

function Home() {
	const animationPeriodMillis = 10000
	let mouseX = 0
	let mouseY = 0
	let lastScroll = 0
	let isScrollingDown = false

	const [animationIndex, setAnimationIndex] = useState(0)
	const [scrollProgress, setScrollProgress] = useState(33)

	const scrollContainer = useRef()

	// Lottie services animations refs
	const lottieAnimationsRefs = [
		useRef(), 
		useRef(), 
		useRef(), 
		useRef(), 
		useRef(), 
		useRef()
	]

	const { cursorEnter, cursorLeave, setCursorColor } = useContext(CursorContext)

	useEffect(() => {
		if (window.location.pathname != "" && window.location.pathname != "/")
			return

		const canvas = document.querySelector("#background")
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const scene = new THREE.Scene()
		scene.background = new THREE.Color(255, 255, 255)

		const geometry = new THREE.TorusGeometry(.7, .2, 16, 100)
		const particlesGeometry = new THREE.BufferGeometry()
		const particlesCount = 1000
		const posArray = new Float32Array(particlesCount * 3)

		for (let i = 0; i < particlesCount * 3; ++i) {
			posArray[i] = (Math.random() - 0.5) * 5
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

		const loader = new THREE.TextureLoader(new THREE.LoadingManager())
		const material = new THREE.PointsMaterial({ size: 0.005, color: 0x000000, sizeAttenuation: true, map: loader.load(dot) })
		const sphereMaterial = new THREE.PointsMaterial({ size: 0.005, color: 0x000000, sizeAttenuation: true, map: loader.load(dot) })
		
		const sphere = new THREE.Points(geometry, sphereMaterial)
		sphere.position.z = -1
		scene.add(sphere)

		const particlesMesh = new THREE.Points(particlesGeometry, material)
		scene.add(particlesMesh)

		const pointLight = new THREE.PointLight(0xffffff, 0.1)
		pointLight.position.x = 2
		pointLight.position.y = 3
		pointLight.position.z = 4
		scene.add(pointLight)

		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
		camera.position.x = 0
		camera.position.y = 0
		camera.position.z = 2

		scene.add(camera)

		let animationFrameId
		let renderer = new THREE.WebGLRenderer({
			canvas: canvas,
		})

		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		document.addEventListener('mousemove', event => {
			mouseX = event.clientX
			mouseY = event.clientY
		})

		window.addEventListener('resize', () => {
			sizes.width = window.innerWidth
			sizes.height = window.innerHeight

			camera.aspect = sizes.width / sizes.height
			camera.updateProjectionMatrix()

			renderer.setSize(sizes.width, sizes.height)
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})

		const scrollContainer = document.querySelector("#scroll-container")
		scrollContainer.addEventListener('scroll', e => {
			const scrollPercentage = parseInt(scrollContainer.scrollTop) / parseInt(scrollContainer.scrollHeight) * 100 + 33
			setScrollProgress(scrollPercentage)

			// Lottie animations controls
			if (scrollPercentage >= 60 && scrollPercentage <= 70 && lottieAnimationsRefs[0].current?.animationItem?.isPaused)
				lottieAnimationsRefs.forEach(anim => anim.current.play())
			
			if ((scrollPercentage < 60 || scrollPercentage > 70) && !lottieAnimationsRefs[0].current?.animationItem?.isPaused)
				lottieAnimationsRefs.forEach(anim => anim.current.stop())

			// const scrollRange = (scrollPercentage - 50) / 25
			isScrollingDown = scrollContainer.scrollTop !== lastScroll ? scrollContainer.scrollTop > lastScroll : isScrollingDown
			particlesMesh.rotation.z = scrollContainer.scrollTop / (scrollContainer.scrollHeight / 2) * 2

			// if (scrollPercentage <= 60) sphere.position.z = scrollRange 
			// else if (scrollPercentage <= 75) sphere.position.z = scrollRange - 2
			// else sphere.position.z = scrollRange * 2 - 3

			// if (scrollPercentage <= 60) 
			// 	sphere.position.x = (scrollPercentage * 4 / 100 - 1) * 2
			
			// else if (scrollPercentage <= 75)
			// 	sphere.position.x = - 1 / (scrollPercentage * 4 / 100 - 1) * 6
			// else
			// 	sphere.position.x = - 1 / (scrollPercentage / 15 - 14 / 3)

			if (scrollPercentage < 40 || scrollPercentage > 85) { 
				gsap.to(scene.background, { duration: 0.2, r: 1, g: 1, b: 1 })

				if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
					sphere.material = sphereMaterial
					particlesMesh.material = material
				}
			} else if (scrollPercentage > 40 && scrollPercentage < 75) {
				gsap.to(scene.background, { duration: 0.2, r: 0, g: 0, b: 0 })

				if (sphere.material.color.r === 0 && sphere.material.color.g === 0 && sphere.material.color.b === 0) {
 					sphere.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
					particlesMesh.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
				}
			}
			//  else if (scrollPercentage > 45) {
			// 	gsap.to(scene.background, { duration: 0.2, r: 1	, g: 1, b: 1 })

			// 	if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
			// 		sphere.material = sphereMaterial
			// 		particlesMesh.material = material
			// 	}
			// }

			lastScroll = scrollContainer.scrollTop

			if (isMobile) sphere.position.z = scrollPercentage <= 35 ? -1 : scrollPercentage / 30 - 2 
			else sphere.position.z = scrollPercentage <= 35 ? -1 : scrollPercentage <= 60 ? scrollPercentage / 60 - 2 : scrollPercentage / 60 - 1
			sphere.rotation.z = scrollPercentage / 5
			return

			if (scrollPercentage < 39) {
				if (isScrollingDown) gsap.to(sphere.position, { duration: 1, z: 0.5, x: 1.5 })
				else gsap.to(sphere.position, { duration: 1, z: -1, x: 0 })
			} else if (scrollPercentage > 41 && scrollPercentage < 59) {
				if (isScrollingDown) gsap.to(sphere.position, { duration: 1, z: 0.5, x: -1.5 })
				else gsap.to(sphere.position, { duration: 1, z: 0.5, x: 1.5 })
			} else if (scrollPercentage > 61 && scrollPercentage < 79) {
				if (isScrollingDown) gsap.to(sphere.position, { duration: 1, z: 0, x: 0 })
				else gsap.to(sphere.position, { duration: 1, z: 0.5, x: -1.5 })
			} else if (scrollPercentage > 81) {
				if (isScrollingDown) gsap.to(sphere.position, { duration: 1, z: 2, x: -0.5 })
				else gsap.to(sphere.position, { duration: 1, z: 0, x: 0 })
			}
		})

		// document.querySelector("#scrollbar").addEventListener("click", e => {
		// 	const percentage = e.clientY / scrollContainer.clientHeight
		// 	scrollContainer.scrollTo({ top: scrollContainer.scrollHeight * percentage, behavior: "smooth" })
		// })

		const clock = new THREE.Clock()

		const tick = () => {
			let elapsedTime = clock.getElapsedTime()

			if (isMobile) {
				sphere.rotation.x = .5 * elapsedTime
				sphere.rotation.y = .5 * elapsedTime
			} else {
				sphere.rotation.x = -(mouseY - window.innerHeight / 2) * 0.0005
				sphere.rotation.y = (mouseX - window.innerWidth / 2) * 0.0005
			}

			// sphere.rotation.z = .5 * elapsedTime

			particlesMesh.rotation.y = -.1 * elapsedTime
			particlesMesh.rotation.x = .1 * elapsedTime

			// if (mouseX > 0) {
			// 	// 	particlesMesh.rotation.x = -mouseY * 0.00008 * elapsedTime
			// 	// 	particlesMesh.rotation.y = mouseX * 0.00008 * elapsedTime

			// 	// 	sphere.rotation.x = -mouseY * 0.00008 * elapsedTime
			// 	// sphere.rotation.y = mouseX * 0.00008 * elapsedTime
			// } else {
			// 	// 	sphere.rotation.x = .05 * elapsedTime
			// 	// 	sphere.rotation.y = .5 * elapsedTime
			// 	// 	particlesMesh.rotation.y = -.1 * elapsedTime
			// }

			renderer.render(scene, camera)
			animationFrameId = window.requestAnimationFrame(tick)
		}

		tick()

		return () => {
			renderer.dispose()
			cancelAnimationFrame(animationFrameId)
		}
	}, [isMobile])

	useEffect(() => {
		if (window.location.pathname != "" && window.location.pathname != "/")
			return

		setCursorColor((scrollProgress > 35 && scrollProgress < 70) ? "bg-white" : "bg-black")

		const logoAnimationId = setInterval(() => {
			if (scrollProgress <= 35)
				setAnimationIndex((oldIndex) => oldIndex == 2 ? 0 : oldIndex + 1)
		}, animationPeriodMillis);

		return () => {
			clearInterval(logoAnimationId)
		}

	}, [scrollProgress])

	if (window.location.href.includes("/about"))
		return <About />;

	const logoScale = 
		scrollProgress <= 35 ? 1 :
		0
		// scrollProgress <= 20 ? 1 :
		// scrollProgress <= 40 ? -(scrollProgress / 20 - 2) : 
		// 0

	if (window.location.pathname != "" && window.location.pathname != "/")
		return <>
			<Lottie lottieRef={ workInProgressAnimaation } style={{ height: "70vh" }} animationData={ workInProgressAnimaation } loop={ true } autoplay={ true } />
			<h1 className="text-center akashi text-3xl mt-6 mb-10">Contact us:</h1>
			<div className="flex justify-center mt-4">
				<a href="https://twitter.com/ZikenLabs" target="_blank"><img src={ xLogo } className="w-16 h-16 rounded-full bg-black p-2 hover:scale-110 transition-all"></img></a>
				<a href="https://discord.gg/kYn7jkRemT" target="_blank"><img src={ discordLogo } className="w-16 h-16 ml-4 hover:scale-110 transition-all"></img></a>
				<a href="mailto:info@zikenlabs.com" target="_blank"><img src={ gmailLogo } className="w-16 h-16 ml-4 hover:scale-110 transition-all"></img></a>
			</div>
		</>

	let pixelTextFontSize = 220;
	if (animationIndex === 0) {
		if (window.innerWidth / 5 <= 120) pixelTextFontSize = window.innerWidth / 5;
		else pixelTextFontSize = 220
	} else {
		if (window.innerWidth / 10 <= 120) pixelTextFontSize = window.innerWidth / 10;
		else pixelTextFontSize = 120
	}
	
	return (    
		<div id="scroll-container" ref={ scrollContainer } style={{ "--scrollbar-color": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) > 60 && Math.trunc(scrollProgress) <= 80)) ? "white" : "black", "--scrollbar-background": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) >= 60 && Math.trunc(scrollProgress) <= 80)) ? "black" : "white" }}
			className="max-h-screen max-w-full overflow-y-scroll overflow-x-hidden scroll-smooth snap-y snap-mandatory">
			<div id="progress-bar" style={{ width: `${scrollProgress}%`, background: (Math.trunc(scrollProgress) > 33 && Math.trunc(scrollProgress) <= 66) ? "white" : "black" }}></div>
			<canvas id="background" className="fixed top-0 -z-20" ></canvas>
			<motion.div style={{ scale: logoScale <= 0 ? 0 : logoScale, transition: "all .5s ease" }} className="h-screen w-screen fixed top-0 -z-10">
				<PixelText 
					id="initial-logo" 
					text={ animationIndex == 0 ? "ZKN LBS" : animationIndex == 1 ? `Your vision. Our expertise.` : `Let's build. Together.` }
					width={ window.innerWidth }
					height={ window.innerHeight }
					fontSize={ pixelTextFontSize }
					// fontSize={ animationIndex == 0 ? 220 : 120 }
					fontFamily="Akashi"
					textAlign="center"
					textBaseLine="middle"
					gradient={ [ [0, '#121517'], [1, '#121517'] ] }
					gap={ isMobile ? 1 : 2 }
					radius={ 5000 }
					initialAnimation={ true }
					hoverAnimation={ true }
					vibrateParticles={ true }
					randomFriction={ 0.25 }
					fixedFriction={ 0.05 }
					randomEase={ 0.05 }
					fixedEase={ 0.1 }
					randomExitAcceleration={ 0.5 }
					fixedExitAcceleration={ 0.5 }
					exitDelay={ animationPeriodMillis / 2 }
					maxTextWidth={ animationIndex == 0 ? 100 : (isMobile ? 350 : 1000) }
					paused={ scrollProgress > 35 }
					isMobile={ isMobile }
				/>
			</motion.div>
			<section className="relative">
				{ isMobile ? 
					<nav id="top-nav" className="w-full h-20 px-4 grid absolute z-30" style={{ transition: "top .25s ease" }}>
						<img src={ logo } className="my-auto block h-20 w-20" alt="logo"></img>
					</nav> :
					<nav id="top-nav" className="w-full h-20 px-4 grid absolute z-30" style={{ transition: "top .25s ease" }}>
						<img src={ logo } className="my-auto block h-20 w-20" alt="logo"></img>
						<div></div> { /* Fill space */ }
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave }  href="/services" className="text-center akashi my-auto text font-extrabold mr-5">Services</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/clients" className="text-center akashi my-auto text-black font-bold mx-5">Clients</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/products" className="text-center akashi my-auto text-black font-bold mx-5">Products</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/about" className="text-center akashi my-auto text-black font-bold mx-5">About</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/blog" className="text-center akashi my-auto text-black font-bold mx-5">Blog</a>
						<a onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } href="/contact" className="text-center akashi my-auto text-black font-bold mx-5">Contact</a>
					</nav> 
				}
			</section>
			<section id="services" className={ `text-white overflow-y-scroll overflow-x-hidden ${ isMobile ? "px-4" : "px-20" }` }>
				<h2 className={ `mt-6 mb-6 ${ isMobile ? "text-4xl text-center" : "text-5xl" } akashi` }>OUR SERVICES</h2>
				<div className={ `grid gap-4 ${ isMobile ? "" : "grid-cols-2 h-5/6" }` } style={{ gridTemplateRows: isMobile ? "" : "33% 33% 33%" }}>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
						{ isMobile ? <>
							<h4 className={ `my-auto text-center text-2xl` }>Project Management</h4>
							<Lottie lottieRef={ lottieAnimationsRefs[0] } className={ `w-52 h-52 mx-auto my-4` } animationData={ projectManagementAnimation } autoplay={ false } />
							<p className={ `my-auto mt-4 text-base` }>We are here to build.  You can entrust your project to us and we will make it prosper and grow. With knowledge, hard work, and determination, we will create the strategy tailored to you and take you through the growth.</p>
						</> : <>
							<Lottie lottieRef={ lottieAnimationsRefs[0] } className="w-28 h-28 my-auto" animationData={ projectManagementAnimation } autoplay={ false } />
							<div className="h-min flex-1 ml-8 mr-2 my-auto">
								<h4 className={ `my-auto text-2xl text-center` }>Project Management</h4>
								<p className={ `my-auto mt-4 text-lg` }>We are here to build.  You can entrust your project to us and we will make it prosper and grow. With knowledge, hard work, and determination, we will create the strategy tailored to you and take you through the growth.</p>
							</div>
						</> }
					</div>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
						{ isMobile ? <>
							<h4 className={ `my-auto text-center text-2xl` }>Graphic Design</h4>
							<Lottie lottieRef={ lottieAnimationsRefs[1] } className={ `w-52 h-52 mx-auto my-4` } animationData={ graphicDesignAnimation  } loop={ true } autoplay={ false } />
							<p className={ `my-auto mt-4 text-base` }>We build your graphic and visual brand identity, creating your logo, banners, templates, and more. The awareness and professionalism of your project will be taken to the next level.</p>
						</> : <>
							<Lottie lottieRef={ lottieAnimationsRefs[1] } className="w-28 h-28 my-auto" animationData={ graphicDesignAnimation  } loop={ true } autoplay={ false } />
							<div className="h-min flex-1 ml-8 mr-2 my-auto">
								<h4 className={ `my-auto text-2xl text-center` }>Graphic Design</h4>
								<p className={ `my-auto mt-4 text-lg` }>We build your graphic and visual brand identity, creating your logo, banners, templates, and more. The awareness and professionalism of your project will be taken to the next level.</p>
							</div>
						</> }
					</div>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
						{ isMobile ? <>
							<h4 className={ `my-auto text-center text-2xl` }>Copywriting</h4>
							<Lottie lottieRef={ lottieAnimationsRefs[2] } className={ `w-52 h-52 mx-auto my-4` } animationData={ copywritingAnimation } loop={ true } autoplay={ false } />
							<p className={ `my-auto mt-4 text-base` }>We are the voice of your project. We will write SEO optimized articles for your blog and help get you to the top of Google results. We will also take care of your social media communication.</p>
						</> : <>
							<Lottie lottieRef={ lottieAnimationsRefs[2] } className="w-28 h-28 my-auto" animationData={ copywritingAnimation } loop={ true } autoplay={ false } />
							<div className="h-min flex-1 ml-8 mr-2 my-auto">
								<h4 className={ `my-auto text-2xl text-center` }>Copywriting</h4>
								<p className={ `my-auto mt-4 text-lg` }>We are the voice of your project. We will write SEO optimized articles for your blog and help get you to the top of Google results. We will also take care of your social media communication.</p>
							</div>
						</> }
					</div>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
						{ isMobile ? <>
							<h4 className={ `my-auto text-center text-2xl` }>Marketing</h4>
							<Lottie lottieRef={ lottieAnimationsRefs[3] } className={ `w-52 h-52 mx-auto my-4` } animationData={ marketingAnimation } loop={ true } autoplay={ false } />
							<p className={ `my-auto mt-4 text-base` }>We will help you make your project known and scale. We will do our best to make your vision come true and bring in more users and profits. Your project just needs to get visibility and scale.</p>
						</> : <>
							<Lottie lottieRef={ lottieAnimationsRefs[3] } className="w-28 h-28 my-auto" animationData={ marketingAnimation } loop={ true } autoplay={ false } />
							<div className="h-min flex-1 ml-8 mr-2 my-auto">
								<h4 className={ `my-auto text-2xl text-center` }>Marketing</h4>
								<p className={ `my-auto mt-4 text-lg` }>We will help you make your project known and scale. We will do our best to make your vision come true and bring in more users and profits. Your project just needs to get visibility and scale.</p>
							</div>
						</> }
					</div>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
						{ isMobile ? <>
							<h4 className={ `my-auto text-center text-2xl` }>Web Design</h4>
							<Lottie lottieRef={ lottieAnimationsRefs[4] } className={ `w-52 h-52 mx-auto my-4` } animationData={ webDesignAnimation } loop={ true } autoplay={ false } />
							<p className={ `my-auto mt-4 text-base` }>We will program your website from scratch according to your needs. From the most complex animations to responsive interactions, we'll concretize your ideas into the perfect online storefront.</p>
						</> : <>
							<Lottie lottieRef={ lottieAnimationsRefs[4] } className="w-28 h-28 my-auto" animationData={ webDesignAnimation } loop={ true } autoplay={ false } />
							<div className="h-min flex-1 ml-8 mr-2 my-auto">
								<h4 className={ `my-auto text-2xl text-center` }>Web Design</h4>
								<p className={ `my-auto mt-4 text-lg` }>We will program your website from scratch according to your needs. From the most complex animations to responsive interactions, we'll concretize your ideas into the perfect online storefront.</p>
							</div>
						</> }
					</div>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
						{ isMobile ? <>
							<h4 className={ `my-auto text-center text-2xl` }>Business consulting</h4>
							<Lottie lottieRef={ lottieAnimationsRefs[5] } className={ `w-52 h-52 mx-auto my-4` } animationData={ businessConsultingAnimation } loop={ true } autoplay={ false } />
							<p className={ `my-auto mt-4 text-base` }>Let's make a free call to get to know each other and understand your business problems. Based on the premises, we will help you develop new growth strategies that will enable you to improve your situation and scale your business.</p>
						</> : <>
							<Lottie lottieRef={ lottieAnimationsRefs[5] } className="w-28 h-28 my-auto" animationData={ businessConsultingAnimation } loop={ true } autoplay={ false } />
							<div className="h-min flex-1 ml-8 mr-2 my-auto">
								<h4 className={ `my-auto text-2xl text-center` }>Business consulting</h4>
								<p className={ `my-auto mt-4 text-lg` }>Let's make a free call to get to know each other and understand your business problems. Based on the premises, we will help you develop new growth strategies that will enable you to improve your situation and scale your business.</p>
							</div>
						</> }
					</div>
				</div>
			</section>
			<section id="clients" className="pt-5 overflow-y-scroll overflow-x-hidden">
				{ isMobile ? <>
					<div className="mb-4">
						<h2 className="text-4xl text-center mt-4 mb-4">Our clients</h2>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ evoloadLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ fiverrLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ plasbitLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ spazioCryptoLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ trakXLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<h2 className="text-4xl text-center mt-4 mb-4">Our products</h2>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ votexLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ trackerXLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ crpytoStocksLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ bestTripTipsLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ newsFromTechLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
						<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mt-4 bg-gray-300 flex rounded-lg mx-auto w-4/5 py-4">
							<div className="mx-auto">
								<img src={ nextToolLogo } className="w-16 m-auto"></img>
								{/* <h4 className="text-center">First client</h4> */}
							</div>
						</motion.div>
					</div>
				</> : <>
					<div className="grid grid-cols-2 h-4/5 mx-12">
						<h2 className="text-center text-6xl ml-12 mt-auto mb-auto">Our clients</h2>
						<div className="grid grid-cols-2 grid-rows-auto gap-4 mb-4">
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div onClick={ () => window.open("https://evoload.co/") } className="m-auto">
									<img src={ evoloadLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ fiverrLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ plasbitLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ spazioCryptoLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ trakXLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ nextIdeaLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
						</div>
					</div> 
					<div className="grid grid-cols-2 h-4/5 mx-12">
						<div className="grid grid-cols-2 grid-rows-auto gap-4 mb-4">
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ bestTripTipsLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">BesTripTips</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ newsFromTechLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ votexLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ trackerXLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ crpytoStocksLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
							<motion.div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg hover:bg-gray-700 transition-colors duration-500">
								<div className="m-auto">
									<img src={ nextToolLogo } className="w-16 m-auto"></img>
									{/* <h4 className="text-center">First client</h4> */}
								</div>
							</motion.div>
						</div>
						<h2 className="text-center text-6xl ml-12 mt-auto mb-auto">Our Products</h2>
					</div>
				</> }
				<footer className="pb-5 z-20" id="footer" style={{ 
					// background: "rgba(255, 255, 255, 0.8)",
					boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
					backdropFilter: "blur(2px)",
					webkitBackdropFilter: "blur(2px)",
					border: "1px solid rgba(0, 0, 0, 0.3)",
					mixBlendMode: "difference",
					webkitMixBlendMode: "difference",
					background: "linear-gradient(to top, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.8)", 
				}} onMouseEnter={ () => setCursorColor("bg-white") } onMouseLeave={ () => setCursorColor("bg-black") }>
					<img src={ logo } className={ `ml-auto mr-auto ${isMobile ? "w-40" : "w-60"}` }></img>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className="ml-auto mr-auto text-center text-black mt-auto mb-auto">
						<a href="/services" target="_blank" className="ml-4 mr-4">Services</a>
						<a href="/products" target="_blank" className="ml-4 mr-4">Products</a>
						<a href="/blog" target="_blank" className="ml-4 mr-4">Blog</a>
						<a href="/about" target="_blank" className="ml-4 mr-4">About</a>
					</div>
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className="flex justify-center mt-6">
						<img src={ linkedinWhiteLogo } className="mix-blend-difference w-10 h-10 ml-2 mr-2"></img>
						<img src={ discordWhiteLogo } className="mix-blend-difference w-10 h-10 ml-2 mr-2"></img>
						<img src={ xWhiteLogo } className="mix-blend-difference w-6 h-6 ml-2 mr-2 mt-2"></img>
						<img src={ instagramWhiteLogo } className="mix-blend-difference w-10 h-10 ml-2 mr-2"></img>
					</div>
					{ isMobile ? <div className="mt-4">
						<h5 className="text-center mt-auto mb-auto">© { new Date().getFullYear() } Ziken Labs Srls <br /> Via della Badia di Cava 82, 00142, Rome, Italy <br /> VAT: IT 17351991009</h5>
						<div className="text-center text-black mt-6">
							{/* <a href="/privacy" target="_blank" className="ml-4 mr-4">Privacy</a>
							<a href="/termsofservice" target="_blank" className="ml-4 mr-4">Terms of Service</a> */}
							<a href="https://www.iubenda.com/privacy-policy/97599587" target="_blank" className="ml-4 mr-4">Privacy Policy</a>
							<a href="https://www.iubenda.com/privacy-policy/97599587/cookie-policy" target="_blank" className="ml-4 mr-4">Cookie Policy</a>
						</div>
					</div> :
					<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className={ isMobile ? "mt-8" : `flex mt-20` }>
						<h3 className="text-black akashi ml-5 text-3xl">ZIKEN LABS</h3>
						<h5 className="flex-1 text-center mt-auto mb-auto">© { new Date().getFullYear() } Ziken Labs Srls - Via della Badia di Cava 82, 00142, Rome, Italy - VAT: IT 17351991009</h5>
						<div onMouseEnter={ cursorEnter } onMouseLeave={ cursorLeave } className="text-right text-black mt-auto mb-auto mr-5">
							{/* <a href="/privacy" target="_blank" className="ml-4 mr-4">Privacy</a> */}
							<a href="https://www.iubenda.com/privacy-policy/97599587" target="_blank" className="ml-4 mr-4">Privacy Policy</a>
							<a href="https://www.iubenda.com/privacy-policy/97599587/cookie-policy" target="_blank" className="ml-4 mr-4">Cookie Policy</a>
							{/* <a href="/termsofservice" target="_blank" className="ml-4 mr-4">Terms of Service</a> */}
						</div>
					</div> }
				</footer>
			</section>
		</div>
	)
}

export default Home;
