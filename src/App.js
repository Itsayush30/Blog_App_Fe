import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from './components/Dashboard'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Body from './components/Body';

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <LogIn />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "blog",
                element: <Dashboard />,
            },
        ],
    },
]);

function App() {
    return (
            <RouterProvider router={appRouter} />
    );
}

export default App;