import { useEffect, useState, useRef } from 'react'
import PixelText from './components/PixelText/PixelText'

import logo from "./assets/logo.png"
import * as THREE from "three"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger" 
import dot from "./assets/dot.png"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { motion, scroll } from 'framer-motion'


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

	const [dragging, setDragging] = useState(false)
	let animationBasic = true

	const [animationIndex, setAnimationIndex] = useState(0)
	const [scrollProgress, setScrollProgress] = useState(20)

	const scrollContainer = useRef()

	useEffect(() => {
		const canvas = document.querySelector("#background")
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const scene = new THREE.Scene()
		scene.background = new THREE.Color(255, 255, 255)

		const geometry = new THREE.TorusGeometry(.7, .2, 16, 100)
		const particlesGeometry = new THREE.BufferGeometry()
		const particlesCount = 5000
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
			const scrollPercentage = scrollContainer.scrollTop / (scrollContainer.scrollHeight) * 100 + 20
			setScrollProgress(scrollPercentage)

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

			if (scrollPercentage < 30 || (scrollPercentage > 45 && scrollPercentage < 65) || scrollPercentage > 85) { 
				gsap.to(scene.background, { duration: 0.2, r: 1, g: 1, b: 1 })

				if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
					sphere.material = sphereMaterial
					particlesMesh.material = material
				}
			} else if ((scrollPercentage > 30 && scrollPercentage < 45) || (scrollPercentage > 65 && scrollPercentage < 85)) {
				gsap.to(scene.background, { duration: 0.2, r: 0, g: 0, b: 0 })

				if (sphere.material.color.r === 0 && sphere.material.color.g === 0 && sphere.material.color.b === 0) {
 					sphere.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
					particlesMesh.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
				}
			} else if (scrollPercentage > 45) {
				gsap.to(scene.background, { duration: 0.2, r: 1	, g: 1, b: 1 })

				if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
					sphere.material = sphereMaterial
					particlesMesh.material = material
				}
			}

			lastScroll = scrollContainer.scrollTop

			if (animationBasic) {
				sphere.position.z = scrollPercentage <= 20 ? -1 : scrollPercentage <= 60 ? scrollPercentage / 20 - 2 : scrollPercentage / 60
				sphere.rotation.z = scrollPercentage / 5
				return
			}

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

			if (animationBasic) {
				sphere.rotation.x = 0
				sphere.rotation.y = 0
			} else {
				sphere.rotation.x = .5 * elapsedTime
				sphere.rotation.y = .5 * elapsedTime
			}

			// sphere.rotation.z = .5 * elapsedTime

			particlesMesh.rotation.y = -.1 * elapsedTime
			particlesMesh.rotation.x = .1 * elapsedTime

			if (animationBasic) {
				sphere.rotation.x = -(mouseY - window.innerHeight / 2) * 0.0005
				sphere.rotation.y = (mouseX - window.innerWidth / 2) * 0.0005

				if (mouseX > 0) {
					// 	particlesMesh.rotation.x = -mouseY * 0.00008 * elapsedTime
					// 	particlesMesh.rotation.y = mouseX * 0.00008 * elapsedTime

					// 	sphere.rotation.x = -mouseY * 0.00008 * elapsedTime
					// sphere.rotation.y = mouseX * 0.00008 * elapsedTime
				} else {
					// 	sphere.rotation.x = .05 * elapsedTime
					// 	sphere.rotation.y = .5 * elapsedTime
					// 	particlesMesh.rotation.y = -.1 * elapsedTime
				}
			}

			renderer.render(scene, camera)
			animationFrameId = window.requestAnimationFrame(tick)
		}

		tick()

		return () => {
			renderer.dispose()
			cancelAnimationFrame(animationFrameId)
		}
	}, [])

	useEffect(() => {
		const logoAnimationId = setInterval(() => {
			if (scrollProgress <= 20)
				setAnimationIndex((oldIndex) => oldIndex == 2 ? 0 : oldIndex + 1)
		}, animationPeriodMillis);

		return () => {
			clearInterval(logoAnimationId)
		}
	}, [scrollProgress])

	const logoScale = 
		scrollProgress <= 25 ? 1 :
		scrollProgress <= 40 ? -(scrollProgress / 20 - 2) : 
		0

	return (
		<div id="scroll-container" ref={ scrollContainer } style={{ "--scrollbar-color": scrollProgress > 30 && scrollProgress < 60 ? "white" : "black", "--scrollbar-background": scrollProgress > 30 && scrollProgress < 60  ? "black" : "white" }}
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

			<div id="progress-bar" style={{ width: `${scrollProgress}%`, background: ((scrollProgress > 20 && scrollProgress <= 40) || (scrollProgress > 60 && scrollProgress <= 80)) ? "white" : "black" }}></div>
			<canvas id="background" className="fixed top-0 -z-20" ></canvas>
			<motion.div animate={{ scale: logoScale < 0 ? 0 : logoScale }} className="h-screen w-screen fixed top-0 -z-10">
				<PixelText 
					id="initial-logo" 
					text={ animationIndex == 0 ? "ZKN LBS" : animationIndex == 1 ? "Your vision. Our expertise." : "Let's build. Together." }
					width={ window.innerWidth }
					height={ window.innerHeight }
					fontSize={ animationIndex == 0 ? 220 : 120 }
					fontFamily="Akashi"
					textAlign="center"
					textBaseLine="middle"
					gradient={ [ [0, '#121517'], [1, '#121517'] ] }
					gap={ 3 }
					radius={ 20000 }
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
					fixedEase={ 0.05 }
					// randomExitAcceleration={ 1 }
					randomExitAcceleration={ 0.5 }
					// fixedExitAcceleration={ 0.2 }
					fixedExitAcceleration={ 0.5 }
					exitDelay={ animationPeriodMillis / 2 }
					maxTextWidth={ animationIndex == 0 ? 100 : animationIndex == 1 ? 1000 : 1000 }
					paused={ scrollProgress > 35 }
				/>
			</motion.div>
			<section className="relative">
				<nav id="top-nav" className="w-full h-20 px-4 grid absolute z-30" style={{ transition: "top .25s ease" }}>
					<img src={ logo } className="my-auto block h-20 w-20 min-w-min" alt="logo"></img>
					<div></div> { /* Fill space */ }
					<a className="text-center akashi my-auto text-black font-extrabold mr-5">Services</a>
					<a className="text-center akashi my-auto text-black font-bold mx-5">Products</a>
					<a className="text-center akashi my-auto text-black font-bold mx-5">Blog</a>
					<a className="text-center akashi my-auto text-black font-bold mx-5">About</a>
					<a className="text-center akashi my-auto text-black font-bold mx-5">Works</a>
					<a className="text-center akashi my-auto text-black font-bold mx-5">Contact</a>
					<button onClick={ () => animationBasic = !animationBasic }>Animation</button>
				</nav>
			</section>
			<section className="text-white overflow-hidden px-60">
				{/* <h2 className='my-20 text-3xl akashi'>OUR SERVICES</h2> */}
				{/* <div className='service'>
					<h4 className='service-header'>Project Management</h4>
					<p className='service-description'>We are here to build.  You can entrust your project to us and we will make it prosper and grow. With knowledge, hard work, and determination, we will create the strategy tailored to you and take you through the growth.</p>
				</div>
				<div className='service'>
					<h4 className='service-header'>Graphic Design</h4>
					<p className='service-description'>We build your graphic and visual brand identity, creating your logo, banners, templates, and more. The awareness and professionalism of your project will be taken to the next level.</p>
				</div>
				<div className='service'>
					<h4 className='service-header'>Copywriting</h4>
					<p className='service-description'>We are the voice of your project. We will write SEO optimized articles for your blog and help get you to the top of Google results. We will also take care of your social media communication.</p>
				</div>
				<div className='service'>
					<h4 className='service-header'>Marketing</h4>
					<p className='service-description'>We will help you make your project known and scale. We will do our best to make your vision come true and bring in more users and profits. Your project just needs to get visibility and scale.</p>
				</div>
				<div className='service'>
					<h4 className='service-header'>Web Design</h4>
					<p className='service-description'>We will program your website from scratch according to your needs. From the most complex animations to responsive interactions, we'll concretize your ideas into the perfect online storefront.</p>
				</div>
				<div className='service'>
					<h4 className='service-header'>Business consulting</h4>
					<p className='service-description'>Let's make a free call to get to know each other and understand your business problems. Based on the premises, we will help you develop new growth strategies that will enable you to improve your situation and scale your business.</p>
				</div> */}

				<div className="cube-container">
					<div id="cube">
						<div className="front">1</div>
						<div className="back">2</div>
						<div className="right">3</div>
						<div className="left">4</div>
						<div className="top">5</div>
						<div className="bottom">6</div>
					</div>
				</div>
			</section>
			<section>
			
			</section>
			<section>
			
			</section>
			<section>
			
			</section>
		</div>
	)
}

/*

Project Management
We are here to build.  You can entrust your project to us and we will make it prosper and grow. With knowledge, hard work, and determination, we will create the strategy tailored to you and take you through the growth.

Graphic Design
We build your graphic and visual brand identity, creating your logo, banners, templates, and more. The awareness and professionalism of your project will be taken to the next level.

Copywriting
We are the voice of your project. We will write SEO optimized articles for your blog and help get you to the top of Google results. We will also take care of your social media communication.

Marketing
We will help you make your project known and scale. We will do our best to make your vision come true and bring in more users and profits. Your project just needs to get visibility and scale.

Web Design
We will program your website from scratch according to your needs. From the most complex animations to responsive interactions, we'll concretize your ideas into the perfect online storefront.

Business consulting
Let's make a free call to get to know each other and understand your business problems. Based on the premises, we will help you develop new growth strategies that will enable you to improve your situation and scale your business.


*/

export default App
