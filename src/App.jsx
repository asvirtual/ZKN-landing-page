import { useEffect, useState } from 'react'
import PixelText from './components/PixelText/PixelText'

import logo from "./assets/logo.png"
import * as THREE from "three"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger" 
import dot from "./assets/dot.png"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { motion } from 'framer-motion'


gsap.registerPlugin(ScrollTrigger)

function App() {
	let animateLogo = true
	const animationPeriodMillis = 10000
	const [animationIndex, setAnimationIndex] = useState(0)
	const [scrollProgress, setScrollProgress] = useState(0)
	
	useEffect(() => {
		
		return

		class Particle {
			constructor(effect, color) {
				this.effect = effect
				this.x = Math.random() * effect.canvasWidth
				this.y = Math.random() * effect.canvasHeight
				// this.x = effect.canvasWidth / 2
				// this.y = effect.canvasHeight / 2
				this.color = color
				this.size = this.effect.gap
				this.angle = Math.random() * Math.PI * 2
				this.force = Math.random() * 5 + 0.5
                this.vx = this.force * Math.cos(this.angle) * (Math.random() - 0.5)
                this.vy = this.force * Math.sin(this.angle) * (Math.random() - 0.5)
				this.distance = 0
				this.friction = Math.random() * 0.6 + 0.15 // 0.6 + 0.15
				this.ease = Math.random() * 0.1 + 0.005 // 0.1 + 0.005
			}
		
			draw() {
				this.effect.ctx.fillStyle = this.color
				// this.effect.ctx.fillRect(this.x, this.y, this.size, this.size)
				this.effect.ctx.beginPath()
				this.effect.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
				this.effect.ctx.fill()
			}
	
			update() {
				if (this.x < 0 || this.x > this.effect.canvasWidth)
					this.vx = -this.vx

				if (this.y < 0 || this.y > this.effect.canvasHeight)
					this.vy = -this.vy
				
				this.x += (this.vx)
				this.y += (this.vy)
			}
			
		}
		
		class Effect {
			constructor(ctx, canvasWidth, canvasHeight) {
				this.ctx = ctx
				this.canvasWidth = canvasWidth
				this.canvasHeight = canvasHeight
		
				this.particles = []
				this.gap = 1
				this.convertToParticles()
			}
		
			convertToParticles() {
				const particlesNumber = 250
				this.particles = []
				// this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

				for (let index = 0; index < particlesNumber; ++index) {								
					// const color = `rgb(0,0,0,${Math.random() * 50 + 1})`
					const color = `rgb(${241 + (Math.random() - 0.5) * 200},${80 + (Math.random() - 0.5) * 200},${37 + (Math.random() - 0.5) * 200},${Math.random() * 50 + 1})`
					// const color = `rgb(0,0,0)`
					this.particles.push(new Particle(this, color))
				}
			}
		
			render() {
				this.particles.forEach(particle => {
					particle.update()
					particle.draw()
				})
			}
		}
		
		const canvas = document.getElementById("background")
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		const ctx = canvas.getContext('2d', {
			// willReadFrequently: true
		})

		let animationFrame
		let effect = new Effect(ctx, canvas.width, canvas.height)
		effect.render()
		
		const animate = (effect) => {
			// ctx.clearRect(0, 0, canvas.width, canvas.height)
			effect.render()
			animationFrame = requestAnimationFrame(() => animate(effect))
		}
		
		animate(effect)

		const id = setInterval(() => {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
			effect.convertToParticles()
		}, animationPeriodMillis / 2);

		return () => {
			clearInterval(id)
			cancelAnimationFrame(animationFrame)
		}
	}, [])

	// Threejs
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

		let mouseX = 0
		let mouseY = 0

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

		document.addEventListener('mousemove', (event) => {
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

		window.addEventListener('scroll', e => {
			const scrollRange = (window.scrollY / (document.body.scrollHeight / 2) - 0.5) * 4
			const scrollPercentage = window.scrollY / (document.body.scrollHeight) * 100
			setScrollProgress(window.scrollY / (document.body.scrollHeight / 2) * 100)

			particlesMesh.rotation.z = window.scrollY / (document.body.scrollHeight / 2) * 2

			// sphere.scale = scrollRange
			sphere.position.z = scrollRange 
			sphere.rotation.z = scrollRange 
			
			// console.log(window.scrollY / (document.body.scrollHeight) * 100)
			// console.log(sphere.material.color.r, sphere.material.color.g, sphere.material.color.b)
			// console.log(sphere.material.color.r === 0 && sphere.material.color.g === 0 && sphere.material.color.b === 0)

			// let color = -((window.scrollY / document.body.scrollHeight) * 3 * 255 - 255)
			// if (color === -0) color = 0
			// console.log(color)
			// scene.background = new THREE.Color(color, color, color)
			// console.log(scene.background)

			if (window.scrollY / (document.body.scrollHeight) * 100 < 30) {
				if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
					sphere.material = sphereMaterial
					particlesMesh.material = material
				}

				if (scene.background.r === 0 && scene.background.g === 0 && scene.background.b === 0)
					scene.background = new THREE.Color(255, 255, 255)
			} else if (scrollPercentage > 30 && scrollPercentage < 60) {
				if (sphere.material.color.r === 0 && sphere.material.color.g === 0 && sphere.material.color.b === 0) {
 					sphere.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
					particlesMesh.material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, sizeAttenuation: true })
				}

				// console.log(scene.background.r)
				if (scene.background.r === 255 && scene.background.g === 255 && scene.background.b === 255)
					// gsap.to(scene.background, { 
					// 	duration: 2, r: 0, g: 0, b: 0 
					// })
					scene.background = new THREE.Color(0x000000)

			} else if (scrollPercentage > 60) {
				if (sphere.material.color.r === 1 && sphere.material.color.g === 1 && sphere.material.color.b === 1) {
					sphere.material = sphereMaterial
					particlesMesh.material = material
				}

				if (scene.background.r === 0 && scene.background.g === 0 && scene.background.b === 0)
					scene.background = new THREE.Color(255, 255, 255)
			}
		})


		const clock = new THREE.Clock()

		const tick = () => {
			let elapsedTime = clock.getElapsedTime()

			// sphere.rotation.x = .5 * elapsedTime
			// sphere.rotation.y = .5 * elapsedTime
			// sphere.rotation.z = .5 * elapsedTime

			particlesMesh.rotation.y = -.1 * elapsedTime
			particlesMesh.rotation.x = .1 * elapsedTime

			if (mouseX > 0) {
			// 	particlesMesh.rotation.x = -mouseY * 0.00008 * elapsedTime
			// 	particlesMesh.rotation.y = mouseX * 0.00008 * elapsedTime

			// 	sphere.rotation.x = -mouseY * 0.00008 * elapsedTime
				// sphere.rotation.y = mouseX * 0.00008 * elapsedTime
				sphere.rotation.y = mouseX * 0.0005
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

		const observer = new IntersectionObserver(function (entries, observer) {
			animateLogo = entries.every(entry => entry.isIntersecting)
		}, {});
		// observer.observe(document.querySelector("#initial-logo"))

		return () => {
			renderer.dispose()
			cancelAnimationFrame(animationFrameId)
			clearInterval(logoAnimationId)
			// observer.unobserve(document.querySelector("#initial-logo"))
			observer.disconnect()
		}
	}, [])


	const logoScale = -((scrollProgress * 2 / 100 - 1))
	// const logoScale = 1

	return (
		<>
			<div id="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
			<section style={{ height: "100vh" }}>
				<nav id="top-nav" className="w-full h-20 px-4 grid" style={{ transition: "top .25s ease", position: "absolute", zIndex: 1 }}>
					<img src={ logo } className="my-auto block h-20 w-20 min-w-min" alt="logo"></img>
					<div></div>
					<a className="text-center my-auto text-black font-bold mr-5">Services</a>
					<a className="text-center my-auto text-black font-bold mx-5">Products</a>
					<a className="text-center my-auto text-black font-bold mx-5">Works</a>
					<a className="text-center my-auto text-black font-bold mx-5">Blog</a>
					<a className="text-center my-auto text-black font-bold mx-5">About</a>
					<a className="text-center my-auto text-black font-bold mx-5">Contact</a>
				</nav>
				{/* <canvas id="background" style={{ position: "absolute", zIndex: -1 }}></canvas> */}
				<canvas id="background" style={{ position: "fixed", top: 0, zIndex: -1 }}></canvas>
				<motion.div style={{ position: "fixed", top: 0 }} animate={{ scale: logoScale < 0 ? 0 : logoScale }} className="relative">
					{/* <PixelText 
						// show={ !loaded }
						id="initial-logo" 
						text={ animationIndex == 0 ? "ZKN LBS" : animationIndex == 1 ? "Your vision. Our expertise." : "Let's build. Together." }
						// framerMotion={ true }
						// framerMotionInitial={{ scale: 1 }}
						// framerMotionExit={{ scale: 0 }}
						// framerMotionTransition={{ delay: delaySeconds, duration: 1 }}
						width={ window.innerWidth }
						height={ window.innerHeight }
						fontSize={ animationIndex == 0 ? 220 : 120 }
						fontFamily="Akashi"
						textAlign="center"
						textBaseLine="middle"
						// gradient={ [ [0.3, '#121517'], [0.5, '#4C4E50'], [0.7, '#BFC0C2'] ] }
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
					/> */}
				</motion.div>
			</section>
			<section>
				<h2>OUR SERVICES</h2>
			</section>
			<section>
			
			</section>

			{/* <PixelText 
				show={ loaded }
				id="logo"
				text="ZIKEN LABS"
				framerMotion={ true }
				framerMotionInitial={{ scale: 0 }}
				framerMotionAnimate={{ scale: 1, animationDuration: 0.5 }}
				framerMotionTransition={{ delay: delaySeconds * 2 }}
				width="300"
				height="160"
				fontSize={ 40 }
				fontFamily="Akashi"
				textAlign="center"
				textBaseLine="middle"
				gradient={ [ [0.3, '#121517'], [0.5, '#4C4E50'], [0.7, '#BFC0C2'] ] }
				gap={ 2 }
				radius={ 3000 }
				initialAnimation={ false }
				hoverAnimation={ true }
				randomFriction={ 0.6 }
				fixedFriction={ 0.15 }
				randomEase={ 0.1 }
				fixedEase={ 0.005 }
			/> */}
		</>
	)
}

export default App
