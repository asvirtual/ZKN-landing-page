import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"

import { useState, createContext } from 'react'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Temp from './pages/Temp/Temp'
import NotFound from './pages/NotFound/NotFound'
import Cursor from "./components/Cursor/Cursor"

export const CursorContext = createContext(null);

function App() {
	// Cursor customization
	const [cursorColor, setCursorColor] = useState("bg-black");
	const [cursorVariant, setCursorVariant] = useState("default");	
	const cursorEnter = () => setCursorVariant("active");
	const cursorLeave = () => setCursorVariant("default");

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
		  path: "/clients",
		  element: <Temp />,
		},
		{
			path: "*",
			element: <NotFound />
		}
	]);
	
	return <CursorContext.Provider value={{ cursorEnter, cursorLeave, setCursorColor }}>
		<Cursor cursorColor={ cursorColor } cursorVariant={ cursorVariant } />
		<RouterProvider router={router} />
	</CursorContext.Provider>
}

export default App;
