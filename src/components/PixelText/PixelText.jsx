import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"


function PixelText(props) {
    let effect

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect
            this.x = props.initialAnimation ? Math.random() * effect.canvasWidth : x
            this.y = props.initialAnimation ? Math.random() * effect.canvasHeight : y
            this.color = color
            this.effect.ctx.fillStyle = this.color
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
            this.friction = Math.random() * props.randomFriction + props.fixedFriction // 0.6 + 0.15
            this.ease = Math.random() * props.randomEase + props.fixedEase // 0.1 + 0.005
            this.exitAcceleration = Math.random() * props.randomExitAcceleration + props.fixedExitAcceleration // 1 + 0.2
            this.exitRandomPos = Math.random()
        }
    
        draw() {
            this.effect.ctx.fillRect(this.x, this.y, this.size, this.size)
            // this.effect.ctx.beginPath()
            // this.effect.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
            // this.effect.ctx.fill()
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
            
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease

            if (this.distance < this.effect.mouse.radius && props.vibrateParticles) {
                this.x += Math.random() * 3 - 1.5
                this.y += Math.random() * 3 - 1.5
            }
        }

        exit() {
            this.dx = this.effect.mouse.x - this.x
            this.dy = this.effect.mouse.y - this.y
            this.distance = this.dx * this.dx + this.dy * this.dy
    
            if (this.distance < this.effect.mouse.radius) {
                this.force = -this.effect.mouse.radius / this.distance

                this.angle = Math.atan2(this.dy, this.dx)
                this.vx += this.force * Math.cos(this.angle)
                this.vy += this.force * Math.sin(this.angle)
            
                this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease
                this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
            } else {
                this.dx = (this.effect.canvasWidth * this.exitRandomPos / 2) - this.x
                this.dy = (this.effect.canvasHeight * this.exitRandomPos / 2) - this.y
                this.distance = this.dx * this.dx + this.dy * this.dy
                this.force = -this.effect.mouse.radius / this.distance
        
                this.angle = Math.atan2(this.dy, this.dx)
                this.vx += this.force * Math.cos(this.angle)
                this.vy += this.force * Math.sin(this.angle)
                
                this.x += (this.vx *= this.exitAcceleration)
                this.y += (this.vy *= this.exitAcceleration)

                // if ((this.x < 0 || this.x > this.effect.canvasWidth) && (this.y < 0 || this.y > this.effect.canvasHeight))
                    // this.effect.ctx.clearRect(this.x, this.y, this.effect.canvasWidth, this.effect.canvasHeight)
            }

            if (props.vibrateParticles) {
                this.x += Math.random() * 3 - 1.5
                this.y += Math.random() * 3 - 1.5
            }
        }
        
    }
    
    class Effect {
        constructor(ctx, canvasWidth, canvasHeight, maxTextWidth) {
            this.ctx = ctx
            this.canvasWidth = canvasWidth
            this.canvasHeight = canvasHeight
            this.textX = props.isMobile ? canvasWidth / 1.9 : canvasWidth / 2
            this.textY = canvasHeight / 2
            this.maxTextWidth = maxTextWidth
    
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
    
            this.ctx.font = `${props.fontSize}px ${props.fontFamily}`
            this.ctx.fontFamily = props.fontFamily
            this.ctx.textAlign = props.textAlign
            this.ctx.textBaseline = props.textBaseline

            if (!this.maxTextWidth) {
                this.ctx.fillText(text, this.textX, this.textY)
                this.convertToParticles()
                return
            }
            
            let linesArray = []
            let lineCounter = 0
            let line = ''
            let words = text.split(' ')
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + ' '
                if (this.ctx.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + ' '
                    lineCounter++
                } else {
                    line = testLine
                }

                linesArray[lineCounter] = line
            }

            let textHeight = props.fontSize * lineCounter
            this.textY = this.canvasHeight / 2 - textHeight / 2
            linesArray.forEach((el, index) => {
                this.ctx.fillText(el, this.textX, this.textY + props.fontSize * index)
            })
    
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
    
                    if (alpha === 0) continue
    
                    const red =  pixels[index]
                    const green =  pixels[index + 1]
                    const blue =  pixels[index + 2]
                    
                    const color = `rgb(${red}, ${green}, ${blue})`
                    this.particles.push(new Particle(this, x, y, color))
                }
            }
        }
    
        render(exit) {
            this.particles.forEach(particle => {
                if (exit) particle.exit()
                else particle.update()
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
        let exit = false
        let animationFrame

        if (props.show == undefined || props.show) {
            const canvas = document.getElementById(props.id)
            canvas.width = props.width
            canvas.height = props.height

            const ctx = canvas.getContext('2d', {
                willReadFrequently: true
            })
            
            ctx.font = `${props.fontFamily} ${props.fontSize}px`
            ctx.fontFamily = props.fontFamily

            effect = new Effect(ctx, canvas.width, canvas.height, props.maxTextWidth)
            effect.wrapText(props.text)
            effect.render()
            
            const animate = (effect) => {
                if (!props.paused) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    effect.render(exit)
                }

                animationFrame = requestAnimationFrame(() => animate(effect))
            }
            
            animate(effect)

            let id
            if (props.exitDelay != null)
                id = setTimeout(() => {
                    if (props.exitDelay != null && !props.paused)
                        exit = !exit
                }, props.exitDelay)

            return () => {
                cancelAnimationFrame(animationFrame)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                effect = null
                if (id)
                    clearTimeout(id)
            }
        }
	}, [props.text, props.exitDelay, props.paused])

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
