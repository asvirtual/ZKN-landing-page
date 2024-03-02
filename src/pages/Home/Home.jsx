import { useEffect, useState, useRef } from 'react'
import PixelText from '../../components/PixelText/PixelText'
import About from '../About/About'

import logo from "../../assets/Ziken Labs.png"
import whiteLogo from "../../assets/whiteLogo.png"
import * as THREE from "three"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger" 
import dot from "../../assets/dot.png"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { motion, scroll } from 'framer-motion'

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"

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
import telegramLogo from "../../assets/telegram_logo.svg"
import linkedinLogo from "../../assets/linkedin_logo.svg"
import linkedinWhiteLogo from "../../assets/linkedInWhiteLogo.svg"
import worldIcon from "../../assets/world_icon.svg"
import instagramLogo from "../../assets/instagram_icon.svg"
import instagramWhiteLogo from "../../assets/instagramWhiteLogo.svg"

import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel } from "swiper/modules"
import 'swiper/swiper-bundle.css'


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


	useEffect(() => {
		if (window.location.pathname != "" && window.location.pathname != "/")
			return

		if (localStorage.getItem("technical-cookies-accepted") === "true") document.getElementById("cookies-banner").style.display = "none"
		document.getElementById("cookies-banner-accept").addEventListener("click", e => {
			localStorage.setItem("technical-cookies-accepted", "true")
			document.getElementById("cookies-banner").style.display = "none"
		})

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
		
		const cursorSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="${(scrollProgress > 35 && scrollProgress < 70) ? "white" : "black"}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
		const rotatedCursorSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 32 32" fill="none"><path transform="rotate(45, 16, 16)" d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="${(scrollProgress > 35 && scrollProgress < 70) ? "white" : "black"}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
		document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(rotatedCursorSVG)}'), auto`;
		document.querySelectorAll("a").forEach(a => a.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursorSVG)}'), auto`);
		document.querySelector("#cookies-banner-accept").style.cursor = `url('data:image/svg+xml;base64,${btoa(cursorSVG)}'), auto`;
		document.querySelector("#footer").style.cursor = `url('data:image/svg+xml;base64,${btoa(rotatedCursorSVG.replace("black", "white"))}'), auto`;
		document.querySelectorAll("#footer a").forEach(a => a.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursorSVG.replace("black", "white"))}'), auto`);

		const logoAnimationId = setInterval(() => {
			if (scrollProgress <= 35)
				setAnimationIndex((oldIndex) => oldIndex == 2 ? 0 : oldIndex + 1)
		}, animationPeriodMillis);

		return () => {
			clearInterval(logoAnimationId)
		}

	}, [scrollProgress])

	useEffect(() => {
		switch (window.location.pathname) {
			case "/services": 
				document.title = "Services | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Discover all the services offered by Ziken Labs. Starting with your vision, we can turn your idea into reality with our experience."
				break;
			case "/clients": 
				document.title = "Clients | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Browse the projects to which Ziken Labs has already contributed. You will find detailed reports on how we can help you grow your project."
				break;
			case "/products": 
				document.title = "Products | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Discover all the products that Ziken Labs has built. Discord bots, customized GPTs, and graphic templates are just some of the products offered!"
				break;
			case "/about": 
				document.title = "About | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Find out who the team behind Ziken Labs is. You will understand how much perseverance and effort it takes to succeed in the competitive digital world."
				break;
			case "/blog": 
				document.title = "Blog | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Read all the latest publications on the Ziken Labs Blog. You will find interesting articles, insights, research, interviews and analysis."
				break;
			case "/contact": 
				document.title = "Contact | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Need a hand to grow your project? You are in the right section. Get in touch with Ziken Labs for collaborations or requests for quotes!"
				break;
		}
	}, []);

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
			<div className={ isMobile ? "absolute bottom-0 pt-2 pb-2 pl-6 pr-6 z-10" : "absolute bottom-8 right-8 pt-2 pb-2 pl-8 pr-8 z-10 w-1/6"} style={{ background: "rgba(255, 255, 255, 0.2)" }} id="cookies-banner">
				<h3 className="text-center akashi">Cookie Notice</h3>
				<p className="mt-4 text-center">🍪 This website uses technical cookies to ensure a smooth user experience. By continuing to browse, you agree to the use of these cookies.</p>
				<div id="cookies-banner-accept" className="mt-8 mb-2 ml-auto mr-auto text-center text-white rounded p-1 bg-green-800 w-fit pt-2 pb-2 pl-8 pr-8">Got it</div>
			</div>
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
					gap={ isMobile ? 1 :2 }
					radius={ 5000 }
					initialAnimation={ true }
					hoverAnimation={ true }
					vibrateParticles={ true }
					// randomFriction={ 0.5 }
					randomFriction={ 0.25 }
					// fixedFriction={ 0.15 }
					fixedFriction={ 0.05 }
					// randomEase={ 0.1 }
					randomEase={ 0.05 }
					// fixedEase={ 0.1 }
					fixedEase={ 0.1 }
					// randomExitAcceleration={ 1 }
					randomExitAcceleration={ 0.5 }
					// fixedExitAcceleration={ 0.2 }
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
						<img src={ logo } className="my-auto block h-20 w-20 min-w-min" alt="logo"></img>
					</nav> :
					<nav id="top-nav" className="w-full h-20 px-4 grid absolute z-30" style={{ transition: "top .25s ease" }}>
						<img src={ logo } className="my-auto block h-20 w-20 min-w-min" alt="logo"></img>
						<div></div> { /* Fill space */ }
						<a href="/services" className="text-center akashi my-auto text-black font-extrabold mr-5">Services</a>
						<a href="/clients" className="text-center akashi my-auto text-black font-bold mx-5">Clients</a>
						<a href="/products" className="text-center akashi my-auto text-black font-bold mx-5">Products</a>
						<a href="/about" className="text-center akashi my-auto text-black font-bold mx-5">About</a>
						<a href="/blog" className="text-center akashi my-auto text-black font-bold mx-5">Blog</a>
						<a href="/contact" className="text-center akashi my-auto text-black font-bold mx-5">Contact</a>
					</nav> 
				}
			</section>
			<section id="services" className={ `text-white overflow-y-scroll overflow-x-hidden ${ isMobile ? "px-4" : "px-20" }` }>
				<h2 className={ `mt-6 mb-6 ${ isMobile ? "text-4xl text-center" : "text-5xl" } akashi` }>OUR SERVICES</h2>
				<div className={ `grid gap-4 ${ isMobile ? "" : "grid-cols-2 h-5/6" }` } style={{ gridTemplateRows: isMobile ? "" : "33% 33% 33%" }}>
					<div className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
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
					<div className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
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
					<div className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
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
					<div className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
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
					<div className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
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
					<div className={ `${ isMobile ? "bg-opacity-60" : "flex bg-opacity-20" } bg-neutral-700 border-neutral-700 border-2 rounded-lg p-4 hover:bg-opacity-100 transition-colors duration-500` }>
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
			<section id="clients" className="px-12 pt-5 overflow-y-scroll overflow-x-hidden">
				{/* <h2 className={ `mt-2 ${ isMobile ? "text-2xl text-center" : "text-4xl ml-20" } akashi` }>OUR CLIENTS & WORKS</h2>
				<Swiper spaceBetween={ 40 } direction="horizontal" loop={ false } centeredSlides={ false } 
					mousewheel={{ forceToAxis: false, sensitivity: 1, releaseOnEdges: true, invert: false }}
					// mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true, invert: false }}
					slidesPerView={ isMobile ? 1.1 : 1.25 } className={ isMobile ? "px-10 h-5/6 py-8" : "px-40 pt-5 pb-20 h-4/5" } modules={[ Mousewheel ]} 
					onReachBeginning={ (swiper) => setTimeout(() => swiper.params.mousewheel.releaseOnEdges = true, 750) }
					onReachEnd={ (swiper) => setTimeout(() => swiper.params.mousewheel.releaseOnEdges = true, 750) } 
					onSlideChange={ (swiper) => setTimeout(() => swiper.params.mousewheel.releaseOnEdges = false, 500) }>
					{ isMobile ?
						<>
							<SwiperSlide className="bg-transparent rounded-lg transition-all flex flex-col backdrop-filter backdrop-blur-sm" >
								<div className="rounded-lg relative mb-2 flex flex-col h-full hover:scale-105" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">TrakX</h2>
									<div style={{ backgroundImage: "url('TrakxClientsImage.png')" }}  className='z-10 bg-cover bg-center mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://trakx.io/" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/official_trakx" target="_blank"><img src={ xLogo } className="w-4 h-4 ml-2 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/trakx-io/" target="_blank"><img src={ linkedinLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
								<div className="bg-cover rounded-lg relative mt-8 mb-2 flex flex-col h-full hover:scale-105" style={{ background: "rgba(215, 215, 205, 0.5)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">PlasBit</h2>
									<div style={{ backgroundImage: "url('PlasBitClientsImage.png')" }}  className='z-10 bg-cover mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://plasbit.com/" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://telegram.me/Plasbit_Community" target="_blank"><img src={ telegramLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/plasbit" target="_blank"><img src={ xLogo } className="w-4 h-4 ml-2 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/plasbitsp/" target="_blank"><img src={ linkedinLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="bg-transparent rounded-lg transition-all flex flex-col backdrop-filter backdrop-blur-sm">	
								<div className="rounded-lg relative mb-2 flex flex-col h-full hover:scale-105" style={{ background: "rgba(252, 115, 3, 0.5)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">SpazioCrypto</h2>
									<div style={{ backgroundImage: "url('SpazioCryptoClientsImage.png')" }}  className='z-10 bg-cover bg-center mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://www.spaziocrypto.com/" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://www.instagram.com/spaziocrypto/" target="_blank"><img src={ instagramLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/Spaziocrypto" target="_blank"><img src={ xLogo } className="w-4 h-4 ml-2 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://discord.gg/BgYQQzst9v" target="_blank"><img src={ discordLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/spaziocrypto/" target="_blank"><img src={ linkedinLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
								<div className="bg-cover rounded-lg relative mt-8 mb-2 flex flex-col h-full hover:scale-105" style={{ background: "rgba(100, 150, 255, 0.3)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">Evoload</h2>
									<div style={{ backgroundImage: "url('EvoloadClientsImage.png')" }}  className='z-10 bg-cover mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://evoload.co/" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://t.me/evoloadofficialEN" target="_blank"><img src={ telegramLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/evoload" target="_blank"><img src={ xLogo } className="w-4 h-4 ml-2 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://discord.com/invite/Dka6HAZzYH" target="_blank"><img src={ discordLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/evoload/" target="_blank"><img src={ linkedinLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="bg-transparent rounded-lg transition-all flex flex-col backdrop-filter backdrop-blur-sm">	
								<div className="rounded-lg relative mb-2 flex flex-col h-full hover:scale-105" style={{ background: "rgba(2, 150, 76, 0.5)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">Fiverr</h2>
									<div style={{ backgroundImage: "url('FiverrClientsImage.png')" }}  className='z-10 bg-cover bg-center mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://www.fiverr.com/pp_studios" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>	
									</div>
								</div>
								<div className="rounded-lg relative mt-8 mb-2 flex flex-col h-full hover:scale-105" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">Tired Club</h2>
									<div style={{ backgroundImage: "url('TiredClubClientsImage.jpg')" }}  className='z-10 bg-cover bg-center mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://tiredclub.art/" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/Tired__Club" target="_blank"><img src={ xLogo } className="w-4 h-4 ml-2 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://discord.com/invite/pCGYfbmHH3" target="_blank"><img src={ discordLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
						</> :
						<>
							<SwiperSlide style={{ background: "rgba(0, 0, 0, 0.3)" }} className="bg-cover rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm">	
								<h2 className='text-black mt-4 mx-4 text-xl akashi text-center'>Trakx: (October 2022 - Now)</h2>
								<h3 className='text-black my-4 mx-4 akashi text-center text-sm'>SEO Strategies - Blog Management</h3>
								<div className="flex-1 bg-center bg-cover rounded-b-lg" style={{ backgroundImage: "url(TrakxClientsImage.png)" }}>
									<div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
										<a href="https://trakx.io/" target="_blank"><img src={ worldIcon } className="w-8 h-8 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/official_trakx" target="_blank"><img src={ xLogo } className="w-8 h-8 ml-4 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/trakx-io/" target="_blank"><img src={ linkedinLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide style={{ background: "rgba(235, 235, 235, 0.3)" }} className="bg-cover rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm">	
								<h2 className='text-black mt-4 mx-4 text-xl akashi text-center'>PlasBit: (October 2022 - Now)</h2>
								<h3 className='text-black my-4 mx-4 akashi text-center text-sm'>SEO Web3 Blog articles</h3>
								<div className="flex-1 bg-cover rounded-b-lg" style={{ backgroundImage: "url(PlasBitClientsImage.png)" }}>
									<div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
										<a href="https://plasbit.com/" target="_blank"><img src={ worldIcon } className="w-8 h-8 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://telegram.me/Plasbit_Community" target="_blank"><img src={ telegramLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/plasbit" target="_blank"><img src={ xLogo } className="w-8 h-8 ml-4 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/plasbitsp/" target="_blank"><img src={ linkedinLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide style={{ background: "rgba(252, 115, 3, 0.3)" }} className="bg-cover rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm">	
								<h2 className='text-black mt-4 mx-4 text-xl akashi text-center'>SpazioCrypto: (October 2022 - Now)</h2>
								<h3 className='text-black my-4 mx-4 akashi text-center text-sm'>Social Media Management - Blog Management - Community Management - Graphic Design - SEO Strategies</h3>
								<div className="flex-1 bg-center bg-cover rounded-b-lg" style={{ backgroundImage: "url(SpazioCryptoClientsImage.png)" }}>
									<div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
										<a href="https://www.spaziocrypto.com/" target="_blank"><img src={ worldIcon } className="w-8 h-8 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://www.instagram.com/spaziocrypto/" target="_blank"><img src={ instagramLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/Spaziocrypto" target="_blank"><img src={ xLogo } className="w-8 h-8 ml-4 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://discord.gg/BgYQQzst9v" target="_blank"><img src={ discordLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/spaziocrypto/" target="_blank"><img src={ linkedinLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="bg-black rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm" 
								style={{ background: "rgba(100, 150, 255, 0.3)" }} // "linear-gradient(to left bottom, rgba(60, 138, 255, 0.1), rgba(100, 150, 255, 1))" }}
							>
								<h2 className='text-black mt-4 mx-4 text-xl akashi text-center'>Evoload: (October 2022 - Now)</h2>
								<h3 className='text-black my-4 mx-4 akashi text-center text-sm'>Social Media Management - Blog Management - Community Management - Graphic Design</h3>
								<div className="flex-1 bg-cover rounded-b-lg relative" style={{ backgroundImage: "url(EvoloadClientsImage.png)" }}>
									<div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
										<a href="https://evoload.co/" target="_blank"><img src={ worldIcon } className="w-8 h-8 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://t.me/evoloadofficialEN" target="_blank"><img src={ telegramLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/evoload" target="_blank"><img src={ xLogo } className="w-8 h-8 ml-4 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://discord.com/invite/Dka6HAZzYH" target="_blank"><img src={ discordLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/evoload/" target="_blank"><img src={ linkedinLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide style={{ background: "rgba(2, 150, 76, 0.3)" }} className="bg-cover rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm">	
								<h2 className='text-black mt-4 mx-4 text-xl akashi text-center'>Fiverr: (October 2022 - Now)</h2>
								<h3 className='text-black my-4 mx-4 akashi text-center text-sm'>Graphic Desgin - SEO Copywriting - Discord Building</h3>
								<div className="flex-1 bg-center bg-cover rounded-b-lg" style={{ backgroundImage: "url(FiverrClientsImage.png)" }}>
									<div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
										<a href="https://www.fiverr.com/pp_studios" target="_blank"><img src={ worldIcon } className="w-8 h-8 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide style={{ background: "rgba(0, 0, 0, 0.3)" }} className="bg-cover rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm">	
								<h2 className='text-black mt-4 mx-4 text-xl akashi text-center'>Tired Club: (October 2022 - Now)</h2>
								<h3 className='text-black my-4 mx-4 akashi text-center text-sm'>Social Media Management - Community Management - Marketing Strategies - Graphic Design</h3>
								<div className="flex-1 bg-center bg-cover rounded-b-lg" style={{ backgroundImage: "url(TiredClubClientsImage.jpg)" }}>
									<div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
										<a href="https://tiredclub.art/" target="_blank"><img src={ worldIcon } className="w-8 h-8 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/Tired__Club" target="_blank"><img src={ xLogo } className="w-8 h-8 ml-4 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://discord.com/invite/pCGYfbmHH3" target="_blank"><img src={ discordLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
							</SwiperSlide>
						</>
					}					
				</Swiper> */}
				<div className="grid grid-cols-2 h-4/5">
					<h2 className="text-6xl ml-12 mt-auto mb-12">Our clients</h2>
					<div className="grid grid-cols-2 grid-rows-3 gap-4 mb-4">
						<motion.div initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
					</div>
				</div>
				<div className="grid grid-cols-2 h-4/5">
					<div className="grid grid-cols-2 grid-rows-3 gap-4 mb-4">
						<motion.div initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
						<motion.div initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="bg-gray-300 flex rounded-lg">
							<div className="m-auto">
								<img src={ instagramWhiteLogo } className="w-12 m-auto"></img>
								<h4 className="text-center">First client</h4>
							</div>
						</motion.div>
					</div>
					<h2 className="text-6xl ml-12 mt-auto mb-12">Our Products</h2>
				</div>
				{/* { isMobile ? 
					<footer style={{ background: "rgba(235, 235, 235, 0.7)" }} className="bg-cover backdrop-filter backdrop-blur-sm px-8 py-4 h-1/5">
						<div className="flex justify-center mt-4">
							<a href="https://twitter.com/ZikenLabs" target="_blank"><img src={ xLogo } className="w-8 h-8 rounded-full bg-black p-2 hover:scale-110 transition-all"></img></a>
							<a href="https://discord.gg/kYn7jkRemT" target="_blank"><img src={ discordLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
							<a href="mailto:info@zikenlabs.com" target="_blank"><img src={ gmailLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
						</div>
					</footer> :
					<footer style={{ background: "rgba(235, 235, 235, 0.7)" }} className="bg-cover backdrop-filter backdrop-blur-sm px-8 py-4 h-1/5">
					<div className="flex justify-center mt-4">
						<a href="https://twitter.com/ZikenLabs" target="_blank"><img src={ xLogo } className="w-8 h-8 rounded-full bg-black p-2 hover:scale-110 transition-all"></img></a>
						<a href="https://discord.gg/kYn7jkRemT" target="_blank"><img src={ discordLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
						<a href="mailto:info@zikenlabs.com" target="_blank"><img src={ gmailLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
					</div>
				</footer>
				} */}
				{/* <footer className="bg-black pb-5" id="footer"> */}
				<footer className="pb-5" style={{ background: "rgba(0, 0, 0, 0.8)" }} id="footer">
					<img src={ whiteLogo } className={ `ml-auto mr-auto ${isMobile ? "w-40" : "w-60"}` }></img>
					{/* <div className="text-center text-white mt-auto mb-auto mr-10">
						<a href="/services" target="_blank" className="ml-4 mr-4">Services</a>
						<a href="/products" target="_blank" className="ml-4 mr-4">Products</a>
						<a href="/blog" target="_blank" className="ml-4 mr-4">Blog</a>
						<a href="/about" target="_blank" className="ml-4 mr-4">About</a>
					</div>
					<div className="flex justify-center">
						<img src={ linkedinWhiteLogo } className="w-8 h-8 ml-2 mr-2"></img>
						<img src={ discordWhiteLogo } className="w-8 h-8 ml-2 mr-2"></img>
						<img src={ xWhiteLogo } className="w-8 h-8 ml-2 mr-2"></img>
						<img src={ instagramWhiteLogo } className="w-8 h-8 ml-2 mr-2"></img>
					</div> */}
					<div className={ `${isMobile ? "" : "flex"} text-gray-100 ml-auto mr-auto text-center w-fit` }>
						<h4 className={ isMobile ? "mb-2" : "ml-4 mr-4" }><a href="https://it.linkedin.com/company/ziken-labs" target="_blank">LinkedIn</a></h4>
						<h4 className={ isMobile ? "mb-2" : "ml-4 mr-4" }><a href="https://discord.gg/kYn7jkRemT" target="_blank" className={ isMobile ? "" : "ml-4 mr-4" }>Discord</a></h4>
						<h4 className={ isMobile ? "mb-2" : "ml-4 mr-4" }><a href="https://twitter.com/ZikenLabs" target="_blank">Twitter</a></h4>
						<h4 className={ isMobile ? "mb-6" : "ml-4 mr-4" }><a href="https://www.instagram.com/zikenlabs/" target="_blank">Instagram</a></h4>
					</div>
					<div className={ `${isMobile ? "" : "flex" + " mt-6" } text-gray-100 ml-auto mr-auto text-center w-fit` }>
						<h4 className={ `ml-4 mr-4 ${isMobile ? "mb-2" : ""}` }><a href="/privacy" target="_blank">Privacy</a></h4>
						<h4 className="ml-4 mr-4"><a href="/termsofservice" target="_blank">Terms Of Service</a></h4>
					</div>
					<div className={ isMobile ? "mt-8" : `grid grid-cols-3 mt-20` }>
						{ isMobile ? <></> : <h3 className="text-white akashi ml-5 text-3xl">ZIKEN LABS</h3> }
						{/* <img src={ whiteLogo } className="w-20 ml-10"></img> */}
						<h5 className="text-center text-gray-400 mt-auto mb-auto">© { new Date().getFullYear() } Ziken Labs</h5>
						{ isMobile ? <></> : <div className="text-right text-white mt-auto mb-auto mr-10">
							<a href="/services" target="_blank" className="ml-4 mr-4">Services</a>
							<a href="/products" target="_blank" className="ml-4 mr-4">Products</a>
							<a href="/blog" target="_blank" className="ml-4 mr-4">Blog</a>
							<a href="/about" target="_blank" className="ml-4 mr-4">About</a>
						</div> }
					</div>
				</footer>
			</section>
			{/* <section id="footer" className="pt-5 overflow-y-scroll overflow-x-hidden">
			</section> */}
		</div>
	)
}

export default Home;
