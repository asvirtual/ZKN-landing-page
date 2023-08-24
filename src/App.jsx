import { useEffect, useState } from 'react'
import PixelText from './components/PixelText/PixelText'

import './fonts/style.css'


function App() {
	const delaySeconds = 2

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			console.log("loaded")
			setLoaded(true)
		}, delaySeconds * 1000)
	}, [])

	return (
		<>
			<PixelText 
				// show={ !loaded }
				id="initial-logo" 
				text="ZKN LBS"
				framerMotion={ true }
				framerMotionInitial={{ scale: 1 }}
				framerMotionExit={{ scale: 0 }}
				framerMotionTransition={{ delay: delaySeconds, duration: 1 }}
				width={ window.innerWidth }
				height={ window.innerHeight }
				fontSize={ 120 }
				fontFamily="Akashi"
				textAlign="center"
				textBaseLine="middle"
				gradient={ [ [0.3, '#121517'], [0.5, '#4C4E50'], [0.7, '#BFC0C2'] ] }
				gap={ 3 }
				radius={ 20000 }
				initialAnimation={ true }
				hoverAnimation={ true }
				randomFriction={ 0.5 }
				fixedFriction={ 0.15 }
				randomEase={ 0.1 }
				fixedEase={ 0.1 }
				maxTextWidth={ 100 }
			/>

			<PixelText 
				show={ loaded }
				// show={ false }
				id="logo"
				text="ZIKEN LABS"
				framerMotion={ true }
				framerMotionInitial={{ scale: 0 }}
				framerMotionAnimate={{ scale: 1, animationDuration: 0.5 }}
				framerMotionTransition={{ delay: delaySeconds * 2 }}
				width="300"
				height="160"
				fontSize={ 40 }
				fontFamily="Bungee"
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
			/>
		</>
	)
}

export default App
