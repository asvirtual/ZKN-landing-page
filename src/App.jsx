import { useEffect, useState, useRef } from 'react'
import PixelText from './components/PixelText/PixelText'

import logo from "./assets/Ziken Labs.png"
import * as THREE from "three"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger" 
import dot from "./assets/dot.png"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { motion, scroll } from 'framer-motion'

import { isMobile } from 'react-device-detect';

import Lottie from "lottie-react";
import projectManagementAnimation from "./assets/project_management.json"
import graphicDesignAnimation from "./assets/graphic_design.json"
import copywritingAnimation from "./assets/copywriting.json"
import webDesignAnimation from "./assets/web_design.json"
import marketingAnimation from "./assets/marketing.json"
import businessConsultingAnimation from "./assets/business_consulting.json"
import workInProgressAnimaation from "./assets/work_in_progress.json"

import xLogo from "./assets/xLogo.png"
import discordLogo from "./assets/discordLogo.svg"
import gmailLogo from "./assets/gmailLogo.svg"
import telegramLogo from "./assets/telegram_logo.svg"
import linkedinLogo from "./assets/linkedin_logo.svg"
import worldIcon from "./assets/world_icon.svg"
import instagramLogo from "./assets/instagram_icon.svg"

import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel } from "swiper/modules"
import 'swiper/swiper-bundle.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({
	immediateRender: false,
	ease: "power1.inOut",
	scrub: true
});

function App() {
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

		// const clientsSection = document.querySelector("#clients");
		// let isInsideClientsSection = false
		// let hasFinishedClientsSectionScrolling = false
		// const observer = new IntersectionObserver((entries) => {
		// 	if (!isInsideClientsSection && entries.some(entry => entry.isIntersecting)) {
		// 		hasFinishedClientsSectionScrolling = false
		// 	}
			
		// 	isInsideClientsSection = entries.some(entry => entry.isIntersecting)
		// }, { threshold: [1] });

		// observer.observe(clientsSection);

		// function transformScroll(event) {
		// 	if (!event.deltaY) {
		// 		return;
		// 	}
			
		// 	// let currentScrollNormalized = event.currentTarget.scrollLeft !== 0 ? currentScrollNormalized
		// 	let scrollLeft
		// 	const currentPage = parseInt(parseInt(event.currentTarget.scrollLeft) / parseInt(parseInt(event.currentTarget.scrollWidth) / 6))

		// 	if (event.deltaY > 0) scrollLeft = ((currentPage + 1) * parseInt(parseInt(event.currentTarget.scrollWidth) / 6))
		// 	else scrollLeft = ((currentPage - 1) * parseInt(parseInt(event.currentTarget.scrollWidth) / 6))

		// 	console.log(currentPage, event.deltaY)

		// 	if ((currentPage === 5 && event.deltaY > 0) || (currentPage === 0 && event.deltaY < 0)) {
		// 		hasFinishedClientsSectionScrolling = true
		// 		return
		// 	}

		// 	hasFinishedClientsSectionScrolling = false
		// 	event.currentTarget.scrollTo({ left: scrollLeft })
		// 	event.preventDefault();
		// }
		  
		// clientsSection.addEventListener('wheel', transformScroll);

		const scrollContainer = document.querySelector("#scroll-container")
		// let scrollContainerScrollTop = 0
		scrollContainer.addEventListener('scroll', e => {
			// if (isInsideClientsSection && !hasFinishedClientsSectionScrolling) {
			// 	scrollContainer.scrollTop = scrollContainerScrollTop
			// 	e.preventDefault();
			// 	return;
			// }

			// scrollContainerScrollTop = scrollContainer.scrollTop

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

		const logoAnimationId = setInterval(() => {
			if (scrollProgress <= 35)
				setAnimationIndex((oldIndex) => oldIndex == 2 ? 0 : oldIndex + 1)
		}, animationPeriodMillis);

		return () => {
			clearInterval(logoAnimationId)
		}

	}, [scrollProgress])


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

	return (
		<div id="scroll-container" ref={ scrollContainer } style={{ "--scrollbar-color": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) > 60 && Math.trunc(scrollProgress) <= 80)) ? "white" : "black", "--scrollbar-background": ((Math.trunc(scrollProgress) > 20 && Math.trunc(scrollProgress) <= 40) || (Math.trunc(scrollProgress) >= 60 && Math.trunc(scrollProgress) <= 80)) ? "black" : "white" }}
			className="max-h-screen max-w-full overflow-y-scroll overflow-x-hidden scroll-smooth snap-y snap-mandatory">
			{/* <div
				id="scrollbar"
				className="absolute h-screen w-2 z-10 right-0"
				style={{
					background: scrollProgress > 30 && scrollProgress < 60 ? "black" : "white"
				}}>
			</div>
			<motion.div 
				id="scrollbar-handle" 
				draggable
				drag="y"
				dragMomentum={ false }
				dragConstraints={ scrollContainer }
				onDragStart={ () => setDragging(true) }
				onDragEnd={ (e, info) => {
					setDragging(false)
					const section = Math.round(e.clientY / (scrollContainer.current?.clientHeight / (numberOfSections - 1)))
					scrollContainer.current?.scrollTo({ top: scrollContainer.current?.scrollHeight / numberOfSections * section, behavior: "smooth" })
				} }
				className="absolute h-10 w-2 z-20 right-0"
				style={{ 
					// top: dragging ? mouseY : scrollProgress > 10 ? `calc(${scrollProgress}vh - 40px)` : 0,
					// y: scrollProgress > 10 ? `calc(${scrollProgress}vh - 40px)` : 0,
					// transform: `none`,
					background: scrollProgress > 30 && scrollProgress < 60 ? "white" : "black",
				}}
				// animate={{ x: !dragging && 0, y: !dragging && 0, transform: !dragging && "none" }}
				animate={{
					y: dragging ? mouseY : scrollProgress > 10 ? `calc(${scrollProgress}vh - 40px)` : 0, 
					transform: dragging && `translateY(${mouseY})`
				}}>
			</motion.div> */}

			<div id="progress-bar" style={{ width: `${scrollProgress}%`, background: (Math.trunc(scrollProgress) > 33 && Math.trunc(scrollProgress) <= 66) ? "white" : "black" }}></div>
			<canvas id="background" className="fixed top-0 -z-20" ></canvas>
			<motion.div style={{ scale: logoScale <= 0 ? 0 : logoScale, transition: "all .5s ease" }} className="h-screen w-screen fixed top-0 -z-10">
				<PixelText 
					id="initial-logo" 
					text={ animationIndex == 0 ? "ZKN LBS" : animationIndex == 1 ? `Your vision. Our expertise.` : `Let's build. Together.` }
					width={ window.innerWidth }
					height={ window.innerHeight }
					fontSize={ animationIndex == 0 ? window.innerWidth / 5 <= 220 ? window.innerWidth / 5 : 220 : window.innerWidth / 10 }
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
					maxTextWidth={ animationIndex == 0 ? 100 : isMobile ? 350 : 1000 }
					paused={ scrollProgress > 35 }
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
				<h2 className={ `mt-8 mb-12 ${ isMobile ? "text-4xl text-center" : "text-5xl" } akashi` }>OUR SERVICES</h2>
				<div className={ `grid gap-4 mb-8 ${ isMobile ? "" : "grid-cols-2" } grid-rows-none` }>
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
			<section id="clients" className="pt-5 overflow-y-scroll overflow-x-hidden">
				<h2 className={ `mt-2 ${ isMobile ? "text-2xl text-center" : "text-4xl ml-20" } akashi` }>OUR CLIENTS & WORKS</h2>
				<Swiper spaceBetween={ 40 } direction="horizontal" loop={ false } centeredSlides={ false } mousewheel={{ forceToAxis: false, sensitivity: 1, releaseOnEdges: true, invert: false }} slidesPerView={ isMobile ? 1.1 : 1.25 } className={ isMobile ? "px-10 h-5/6 py-8" : "px-40 pt-5 pb-20 h-4/5" } modules={[ Mousewheel ]} 
					onReachBeginning={ (swiper) => setTimeout(() => swiper.params.mousewheel.releaseOnEdges = true, 750) }
					onReachEnd={ (swiper) => setTimeout(() => swiper.params.mousewheel.releaseOnEdges = true, 750) } 
					onSlideChange={ (swiper) => setTimeout(() => swiper.params.mousewheel.releaseOnEdges = false, 500) }>
					{ isMobile ?
						<>
							<SwiperSlide className="bg-transparent rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm" >
								<div className="rounded-lg relative mb-2 flex flex-col h-full" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">TrakX</h2>
									<div style={{ backgroundImage: "url('TrakxClientsImage.png')" }}  className='z-10 bg-cover bg-center mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://trakx.io/" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://twitter.com/official_trakx" target="_blank"><img src={ xLogo } className="w-4 h-4 ml-2 rounded-full bg-black p-1 hover:scale-110 transition-all"></img></a>
										<a href="https://www.linkedin.com/company/trakx-io/" target="_blank"><img src={ linkedinLogo } className="w-4 h-4 ml-2 hover:scale-110 transition-all"></img></a>
									</div>
								</div>
								<div className="bg-cover rounded-lg relative mt-8 mb-2 flex flex-col h-full" style={{ background: "rgba(215, 215, 205, 0.5)" }}>
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
							<SwiperSlide className="bg-transparent rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm" 
								// "linear-gradient(to left bottom, rgba(60, 138, 255, 0.1), rgba(100, 150, 255, 1))" }}
							>	
								<div className="rounded-lg relative mb-2 flex flex-col h-full" style={{ background: "rgba(252, 115, 3, 0.5)" }}>
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
								<div className="bg-cover rounded-lg relative mt-8 mb-2 flex flex-col h-full" style={{ background: "rgba(100, 150, 255, 0.3)" }}>
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
							<SwiperSlide className="bg-transparent rounded-lg hover:scale-105 transition-all flex flex-col backdrop-filter backdrop-blur-sm" 
								// "linear-gradient(to left bottom, rgba(60, 138, 255, 0.1), rgba(100, 150, 255, 1))" }}
							>	
								<div className="rounded-lg relative mb-2 flex flex-col h-full" style={{ background: "rgba(2, 150, 76, 0.5)" }}>
									<h2 className="text-black my-1 text-base akashi text-center">Fiverr</h2>
									<div style={{ backgroundImage: "url('FiverrClientsImage.png')" }}  className='z-10 bg-cover bg-center mb-2 rounded-t-lg pt-2 text-white text-xl akashi text-center flex-1 h-4/5'></div>
									<div className="flex justify-center mx-auto mb-3">
										<a href="https://www.fiverr.com/pp_studios" target="_blank"><img src={ worldIcon } className="w-4 h-4 bg-black rounded-full p-1 hover:scale-110 transition-all"></img></a>	
									</div>
								</div>
								<div className="rounded-lg relative mt-8 mb-2 flex flex-col h-full" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
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
				</Swiper>
				<footer style={{ background: "rgba(235, 235, 235, 0.7)" }} className="bg-cover backdrop-filter backdrop-blur-sm px-8 py-4 h-1/5">
					{/* <h5 className="text-center">Contact us</h5> */}
					<div className="flex justify-center mt-4">
						<a href="https://twitter.com/ZikenLabs" target="_blank"><img src={ xLogo } className="w-8 h-8 rounded-full bg-black p-2 hover:scale-110 transition-all"></img></a>
						<a href="https://discord.gg/kYn7jkRemT" target="_blank"><img src={ discordLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
						<a href="mailto:info@zikenlabs.com" target="_blank"><img src={ gmailLogo } className="w-8 h-8 ml-4 hover:scale-110 transition-all"></img></a>
					</div>
				</footer>
			</section>
		</div>
	)
}

export default App
