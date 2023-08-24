import { useEffect, useState } from 'react'
import PixelText from './components/PixelText/PixelText'


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
				show={ !loaded }
				id="initial-logo" 
				text="ZKN LABS"
				framerMotion={ true }
				framerMotionInitial={{ scale: 1 }}
				framerMotionExit={{ scale: 0 }}
				framerMotionTransition={{ delay: delaySeconds, duration: 1 }}
				width={ window.innerWidth }
				height={ window.innerHeight }
				fontSize="120px"
				fontFamily="Bungee"
				textAlign="center"
				textBaseLine="middle"
				gradient={ [ [0.3, '#121517'], [0.5, '#4C4E50'], [0.7, '#BFC0C2'] ] }
				gap={ 3 }
				radius={ 20000 }
				initialAnimation={ true }
				hoverAnimation={ true }
			/>

			<PixelText 
				id="logo"
				text="ZKN LABS"
				framerMotion={ true }
				framerMotionInitial={{ scale: 0 }}
				framerMotionAnimate={{ scale: 1, animationDuration: 0.1 }}
				framerMotionTransition={{ delay: 5.001 }}
				width="300"
				height="160"
				fontSize="40px"
				fontFamily="Bungee"
				textAlign="center"
				textBaseLine="middle"
				gradient={ [ [0.3, '#121517'], [0.5, '#4C4E50'], [0.7, '#BFC0C2'] ] }
				gap={ 2 }
				radius={ 3000 }
				initialAnimation={ false }
				hoverAnimation={ true }
			/>
		</>
	)
}

export default App
