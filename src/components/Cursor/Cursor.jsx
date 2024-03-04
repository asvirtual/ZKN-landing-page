import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { isMobile } from 'react-device-detect';


export default function Cursor(props) {
	if (isMobile) return null;
	
	const [mousePos, setMousePos] = useState({ 
		x: window.document.documentElement.clientWidth / 2,
		y: window.document.documentElement.clientHeight / 2
	})

	useEffect(() => {
		const mouseMove = e => setMousePos({ x: e.clientX, y: e.clientY });

 		window.addEventListener("mousemove", mouseMove);
		return () => window.removeEventListener("mousemove", mouseMove);
	}, [])

	const cursorVariants = {
		default: {
			x: mousePos.x - 12,
			y: mousePos.y - 12,
		},
		active: {
			x: mousePos.x - 12,
			y: mousePos.y - 12,
			scale: 1.5,
		}
	}

	return <motion.div id="cursor" className={ `overflow-y-auto z-10 h-6 w-6 rounded-full fixed top-0 left-0 ${props.cursorColor}` } variants={ cursorVariants } animate={ props.cursorVariant } transition={{ duration: 0.1, stiffness: 600, damping: 25 }}></motion.div>
    return
}
