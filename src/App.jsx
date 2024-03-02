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
	
	return (
		<RouterProvider router={router} />
	)
}

export default App;
