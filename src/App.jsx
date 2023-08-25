import { useEffect, useState } from 'react'
import PixelText from './components/PixelText/PixelText'


function App() {
	const animationPeriodMillis = 10000
	const [animationIndex, setAnimationIndex] = useState(0)
	
	useEffect(() => {
		const id = setInterval(() => setAnimationIndex((oldIndex) => oldIndex == 2 ? 0 : oldIndex + 1), animationPeriodMillis);
		return () => clearInterval(id)
	  }, []);


	return (
		<>
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
				gap={ 2 }
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
				// maxTextWidth={ 100 }
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
