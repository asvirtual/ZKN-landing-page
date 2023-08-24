import { useEffect, useState } from 'react'


class Particle {
	constructor(effect, x, y, color) {
		this.effect = effect
		this.x = Math.random() * effect.canvasWidth
		this.y = Math.random() * effect.canvasHeight
		this.color = color
		this.originX = x
		this.originY = y
		this.size = this.effect.gap
		this.dx = 0
		this.dy = 0
		this.vx = 0
		this.vy = 0
		this.force = 0
		this.angle = 0
		this.distance = 0
		this.friction = Math.random() * 0.6 + 0.15
		this.ease = Math.random() * 0.1 + 0.005
	}

	draw() {
		this.effect.ctx.fillStyle = this.color
		this.effect.ctx.fillRect(this.x, this.y, this.size, this.size)
	}

	update() {
		this.dx = this.effect.mouse.x - this.x
		this.dy = this.effect.mouse.y - this.y
		this.distance = this.dx * this.dx + this.dy * this.dy
		this.force = -this.effect.mouse.radius / this.distance

		if (this.distance < this.effect.mouse.radius) {
			this.angle = Math.atan2(this.dy, this.dx)
			this.vx += this.force * Math.cos(this.angle)
			this.vy += this.force * Math.sin(this.angle)
		
		}
		
		this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
		this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
	}
}

class Effect {
	constructor(ctx, canvasWidth, canvasHeight) {
		this.ctx = ctx
		this.canvasWidth = canvasWidth
		this.canvasHeight = canvasHeight
		this.textX = canvasWidth / 2
		this.textY = canvasHeight / 2

		this.particles = []
		this.gap = 3
		this.mouse = {
			radius: 20000,
			x: 0,
			y: 0
		}
		
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = e.x
			this.mouse.y = e.y
		})
	}

	wrapText(text) {
		const gradient = this.ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight)
		gradient.addColorStop(0.3, '#121517')
		gradient.addColorStop(0.5, '#4C4E50')
		gradient.addColorStop(0.7, '#BFC0C2')

		this.ctx.fillStyle = gradient

		this.ctx.font = '80px Helvetica'
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'

		this.ctx.fillText(text, this.textX, this.textY)
		this.convertToParticles()
	}

	convertToParticles() {
		this.particles = []
		const pixels = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

		for (let y = 0; y < this.canvasHeight; y += this.gap) {
			for (let x = 0; x < this.canvasWidth; x += this.gap) {
				const index = (y * this.canvasWidth + x) * 4
				const alpha = pixels[index + 3]

				if (alpha == 0) continue

				const red =  pixels[index]
				const green =  pixels[index + 1]
				const blue =  pixels[index + 2]
				
				const color = `rgb(${red}, ${green}, ${blue})`
				this.particles.push(new Particle(this, x, y, color))
			}
		}
	}

	render() {
		this.particles.forEach(particle => {
			particle.update()
			particle.draw()
		})
	}

	resize(width, height) {
		this.canvasWidth = width
		this.canvasHeight = height
		this.textX = width / 2
		this.textY = height / 2
	}
}

function App() {
	useEffect(() => {
		const canvas = document.getElementById('logo')
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const ctx = canvas.getContext('2d', {
			willReadFrequently: true
		})

		const effect = new Effect(ctx, canvas.width, canvas.height)
		effect.wrapText('ZKN LABS')
		effect.render()
		
		const animate = (effect) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			effect.render()
			requestAnimationFrame(() => animate(effect))
		}
		
		animate(effect)	
		
		window.addEventListener('resize', () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			effect.resize(canvas.width, canvas.height)
			effect.wrapText('ZKN LABS')
		});
	})
	
	return (
		<>
			<canvas id="logo" className="bg-black-700"></canvas>
		</>
	)
}

export default App
