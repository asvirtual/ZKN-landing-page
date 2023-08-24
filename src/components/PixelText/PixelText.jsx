import { useEffect } from 'react'
import { AnimatePresence, delay, motion } from "framer-motion"


function PixelText(props) {
    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect
            this.x = props.initialAnimation ? Math.random() * effect.canvasWidth : x
            this.y = props.initialAnimation ? Math.random() * effect.canvasHeight : y
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
            // this.ease = Math.random() * 0.1 + 0.005
            this.ease = Math.random() * 0.1 + 0.02
        }
    
        draw() {
            this.effect.ctx.fillStyle = this.color
            // this.effect.ctx.fillRect(this.x, this.y, this.size, this.size)
            this.effect.ctx.beginPath()
            this.effect.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
            this.effect.ctx.fill()
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
            this.gap = props.gap
            this.mouse = {
                radius: props.radius,
                x: NaN,
                y: NaN
            }
            
            if (props.hoverAnimation)
                window.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.x
                    this.mouse.y = e.y
                })  
        }
    
        wrapText(text) {
            if (props.gradient) {
                const gradient = this.ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight)
                props.gradient.forEach(([position, color]) => gradient.addColorStop(position, color))    
                this.ctx.fillStyle = gradient
            }
    
            this.ctx.font = `${props.fontSize} ${props.fontFamily}`
            this.ctx.textAlign = props.textAlign
            this.ctx.textBaseline = props.textBaseline
    
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

	useEffect(() => {
		const canvas = document.getElementById(props.id)
		canvas.width = props.width
		canvas.height = props.height

		const ctx = canvas.getContext('2d', {
			willReadFrequently: true
		})

		const effect = new Effect(ctx, canvas.width, canvas.height)
		effect.wrapText(props.text)
		effect.render()
		
		const animate = (effect) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			effect.render()
			requestAnimationFrame(() => animate(effect))
		}
		
		animate(effect)	
		
		window.addEventListener('resize', () => {
			// canvas.width = window.innerWidth
			// canvas.height = window.innerHeight
			// effect.resize(canvas.width, canvas.height)
			// effect.wrapText(props.text)
		});
	}, [])

    // return <motion.canvas  animate={{ animationdel scale: 0,  }} exit={{ animationDura }} ></motion.canvas>
	return props.framerMotion ? 
        <AnimatePresence>
            { (props.show == undefined || props.show) && <motion.canvas id={ props.id } className={ props.className } key={ props.id }
                initial={ props.framerMotionInitial } 
                animate={ props.framerMotionAnimate } 
                exit={ props.framerMotionExit }
                transition={ props.framerMotionTransition }></motion.canvas> }
        </AnimatePresence> : 
        <canvas id={ props.id } className={ props.className }></canvas>
}

export default PixelText
