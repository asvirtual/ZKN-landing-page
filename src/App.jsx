import { useEffect, useEffecct, useRef } from 'react'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Temp from './pages/Temp/Temp'
import NotFound from './pages/NotFound/NotFound'

function App() {
	const router = createBrowserRouter([
		{
		  path: "",
		  element: <Home />,
		},
		{
		  path: "/about",
		  element: <About />,
		},
		{
		  path: "/privacy",
		  element: <Temp />,
		},
		{
		  path: "/termsofservice",
		  element: <Temp />,
		},
		{
		  path: "/services",
		  element: <Temp />,
		},
		{
		  path: "/blog",
		  element: <Temp />,
		},
		{
		  path: "/products",
		  element: <Temp />,
		},
		{
			path: "*",
			element: <NotFound />
		}
	]);

	useEffect(() => {
		switch (window.location.pathname) {
			case "/services": 
				document.title = "Services | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Discover all the services offered by Ziken Labs. Starting with your vision, we can turn your idea into reality with our experience."
				break;
			case "/clients": 
				document.title = "Clients | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Browse the projects to which Ziken Labs has already contributed. You will find detailed reports on how we can help you grow your project."
				break;
			case "/products": 
				document.title = "Products | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Discover all the products that Ziken Labs has built. Discord bots, customized GPTs, and graphic templates are just some of the products offered!"
				break;
			case "/about": 
				document.title = "About | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Find out who the team behind Ziken Labs is. You will understand how much perseverance and effort it takes to succeed in the competitive digital world."
				break;
			case "/blog": 
				document.title = "Blog | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Read all the latest publications on the Ziken Labs Blog. You will find interesting articles, insights, research, interviews and analysis."
				break;
			case "/contact": 
				document.title = "Contact | Ziken Labs"
				document.getElementsByTagName("META")[2].content = "Need a hand to grow your project? You are in the right section. Get in touch with Ziken Labs for collaborations or requests for quotes!"
				break;
		}
	}, []);
	
	return (
		<RouterProvider router={router} />
	)
}

export default App;
