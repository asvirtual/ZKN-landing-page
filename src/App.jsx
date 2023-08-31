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
	const numberOfSections = 3
	let animateLogo = true
	const animationPeriodMillis = 10000
	let mouseX = 0
	let mouseY = 0

	const [dragging, setDragging] = useState(false)
	const [animationIndex, setAnimationIndex] = useState(0)
	const [scrollProgress, setScrollProgress] = useState(0)

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
			const scrollPercentage = scrollContainer.scrollTop / (scrollContainer.scrollHeight / numberOfSections * (numberOfSections - 1)) * 100
			setScrollProgress(scrollPercentage)

			const scrollRange = (scrollContainer.scrollTop / (scrollContainer.scrollHeight / 2) - 0.5) * 4

			particlesMesh.rotation.z = scrollContainer.scrollTop / (scrollContainer.scrollHeight / 2) * 2
			sphere.position.z = scrollRange 
			sphere.rotation.z = scrollRange 

			animateLogo = scrollPercentage <= 33

			if (scrollPercentage <= 33)
				sphere.position.x = scrollPercentage * 3 / 100
			else if (scrollPercentage <= 66) 
				sphere.position.x = 1 - (scrollPercentage - 33) * 3 / 100

			if (scrollPercentage < 30) {
				gsap.to(scene.background, { duration: 0.2, r: 1, g: 1, b: 1 })

				if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
					sphere.material = sphereMaterial
					particlesMesh.material = material
				}
			} else if (scrollPercentage > 30 && scrollPercentage < 60) {
				gsap.to(scene.background, { duration: 0.2, r: 0, g: 0, b: 0 })

				if (sphere.material.color.r === 0 && sphere.material.color.g === 0 && sphere.material.color.b === 0) {
 					sphere.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
					particlesMesh.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
				}
			} else if (scrollPercentage > 60) {
				gsap.to(scene.background, { duration: 0.2, r: 1	, g: 1, b: 1 })

				if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
					sphere.material = sphereMaterial
					particlesMesh.material = material
				}
			}
		})

		document.querySelector("#scrollbar").addEventListener("click", e => {
			const percentage = e.clientY / scrollContainer.clientHeight
			scrollContainer.scrollTo({ top: scrollContainer.scrollHeight * percentage, behavior: "smooth" })
		})

		const clock = new THREE.Clock()

		const tick = () => {
			let elapsedTime = clock.getElapsedTime()

			sphere.rotation.x = .5 * elapsedTime
			sphere.rotation.y = .5 * elapsedTime
			// sphere.rotation.z = .5 * elapsedTime

			particlesMesh.rotation.y = -.1 * elapsedTime
			particlesMesh.rotation.x = .1 * elapsedTime

			if (mouseX > 0) {
				// 	particlesMesh.rotation.x = -mouseY * 0.00008 * elapsedTime
				// 	particlesMesh.rotation.y = mouseX * 0.00008 * elapsedTime

				// 	sphere.rotation.x = -mouseY * 0.00008 * elapsedTime
				// sphere.rotation.y = mouseX * 0.00008 * elapsedTime
				// sphere.rotation.x = -(mouseY - window.innerHeight / 2) * 0.0005
				// sphere.rotation.y = (mouseX - window.innerWidth / 2) * 0.0005
			} else {
				// 	sphere.rotation.x = .05 * elapsedTime
				// 	sphere.rotation.y = .5 * elapsedTime
				// 	particlesMesh.rotation.y = -.1 * elapsedTime
			}

			renderer.render(scene, camera)
			animationFrameId = window.requestAnimationFrame(tick)
		}

		tick()

		const logoAnimationId = setInterval(() => {
			if (animateLogo)
				setAnimationIndex((oldIndex) => oldIndex == 2 ? 0 : oldIndex + 1)
		}, animationPeriodMillis);

		return () => {
			renderer.dispose()
			cancelAnimationFrame(animationFrameId)
			clearInterval(logoAnimationId)
		}
	}, [])

	const logoScale = -((scrollProgress * 4 / 100 - 1))

	return (
		<div id="scroll-container" ref={ scrollContainer } style={{ "--scrollbar-color": scrollProgress > 30 && scrollProgress < 60 ? "white" : "black", "--scrollbar-background": scrollProgress > 30 && scrollProgress < 60  ? "black" : "white" }}
			className="max-h-screen max-w-full overflow-y-scroll overflow-x-hidden scroll-smooth snap-y snap-mandatory">
			<div
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
					// top: scrollProgress > 10 ? `calc(${scrollProgress}vh - 40px)` : 0,
					// y: scrollProgress > 10 ? `calc(${scrollProgress}vh - 40px)` : 0,
					// transform: `translateY(0)`,
					background: scrollProgress > 30 && scrollProgress < 60 ? "white" : "black",
				}}
				// animate={{ x: !dragging && 0, y: !dragging && 0, transform: !dragging && "none" }}
				animate={{
					y: dragging ? mouseY : scrollProgress > 10 ? `calc(${scrollProgress}vh - 40px)` : 0
				}}>

			</motion.div>
			<div id="progress-bar" style={{ width: `${scrollProgress}%`, background: scrollProgress > 30 && scrollProgress < 66 ? "white" : "black" }}></div>
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
					randomFriction={ 0.5 }
					fixedFriction={ 0.15 }
					randomEase={ 0.1 }
					fixedEase={ 0.1 }
					randomExitAcceleration={ 1 }
					fixedExitAcceleration={ 0.2 }
					exitDelay={ animationPeriodMillis / 2 }
					maxTextWidth={ animationIndex == 0 ? 100 : animationIndex == 1 ? 1000 : 1000 }
				/>
			</motion.div>
			<section className="relative">
				<nav id="top-nav" className="w-full h-20 px-4 grid" style={{ transition: "top .25s ease", position: "absolute", zIndex: 1 }}>
					<img src={ logo } className="my-auto block h-20 w-20 min-w-min" alt="logo"></img>
					<div></div> { /* Fill space */ }
					<a className="text-center my-auto text-black font-extrabold mr-5">Services</a>
					<a className="text-center my-auto text-black font-bold mx-5">Products</a>
					<a className="text-center my-auto text-black font-bold mx-5">Works</a>
					<a className="text-center my-auto text-black font-bold mx-5">Blog</a>
					<a className="text-center my-auto text-black font-bold mx-5">About</a>
					<a className="text-center my-auto text-black font-bold mx-5">Contact</a>
				</nav>
			</section>
			<section className="text-white overflow-hidden">
				<div className="w-4/5 ">
					<h2 className="text-center mt-10">OUR SERVICES</h2>
				</div>
			</section>
			<section>
			
			</section>
		</div>
	)
}

export default App
