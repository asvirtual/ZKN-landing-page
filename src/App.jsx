import { useEffect, useState } from 'react'
import PixelText from './components/PixelText/PixelText'

import logo from "./assets/cursor.png"


function App() {
	let animateLogo = true
	const animationPeriodMillis = 10000
	const [animationIndex, setAnimationIndex] = useState(0)

	useEffect(() => {
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
	
	useEffect(() => {
		window.addEventListener('scroll', e => {
			const nav = document.querySelector("#top-nav")
			if (window.scrollY > 80) nav.style.top = "0px"
			else nav.style.top = "-80px"
			// console.log(window.scrollY)
		})

		const id = setInterval(() => {
			if (animateLogo)
				setAnimationIndex((oldIndex) => oldIndex == 2 ? 0 : oldIndex + 1)
		}, animationPeriodMillis);

		const callback = function (entries, observer) {
			animateLogo = entries.every(entry => entry.isIntersecting)
		};
		
		const observer = new IntersectionObserver(callback, {});
		observer.observe(document.querySelector("#initial-logo"))
		
		return () => {
			clearInterval(id)
			observer.unobserve(document.querySelector("#initial-logo"))
			observer.disconnect()
		}
	}, []);

	return (
		<>
			<nav id="top-nav" className="fixed w-full h-20 bg-black flex" style={{ top: "-80px", transition: "top .25s ease" }}>
				<img src={ logo } className="w-32 h-20 mx-auto ml-auto mr-auto block text-center" alt="logo"></img>
				<a className="flex-1 text-center mt-auto mb-auto">Services</a>
				<a className="flex-1 text-center mt-auto mb-auto">Products</a>
				<a className="flex-1 text-center mt-auto mb-auto">Works</a>
				<a className="flex-1 text-center mt-auto mb-auto">Blog</a>
				<a className="flex-1 text-center mt-auto mb-auto">About</a>
				<a className="flex-1 text-center mt-auto mb-auto">Contact</a>
			</nav>
			<canvas id="background" style={{ position: "absolute", zIndex: -1 }}></canvas>
			<PixelText 
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
			/>

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
