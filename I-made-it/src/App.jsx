import { useSelector } from 'react-redux';
import { selectToken } from './Components/TokenSlice.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./assets/bootstrap/css/bootstrap.css"
import "./assets/bootstrap/js/bootstrap.bundle.js" 
import { SignUp } from "./Components/SignUp.jsx"
import { SignIn } from "./Components/SignIn.jsx"
import { Home } from "./Components/Home"
import { Users } from "./Components/Users"
import { OneUser } from "./Components/UniqueUser"
import { useEffect } from "react"
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  // Retrieve token from localStorage
  const token = useSelector(selectToken);

   // Log the token retrieved from local storage
    useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Token from local storage:', storedToken);

  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/logout",
      element: <SignIn />,
    },
    {
      path: "/home",
      element:  <div>
        <ErrorBoundary fallback={<p>Sorry</p>}>
          <Home />
        </ErrorBoundary>
      </div> 
    },
    {
      path: "/info/users",
      element: <Users />,
      loader: async() => {
        try {
          // Include token in request headers
          const storedToken = localStorage.getItem('token');
          console.log('Token from local storage:', storedToken);

          
            const headers = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${storedToken}`
            };
          

          if(!token && !storedToken){
            alert("Login first !")
            window.location.replace("/");
          }

          console.log('Headerso: ', headers);
          const res = await fetch("http://localhost:3000/info/users", { 
              headers: headers
            });
          const data = await res.json();
          console.log(data);
          return data;
        } catch (error) {
          console.log(error)
          return null;
        }
      }
    },
    {
      path: "/info/users/:id",
      element: <div>
        <OneUser />
      </div>,
      loader: async ({params}) => {
        try {
          const id = params.id;
          // Include token in request headers
          const storedToken = localStorage.getItem('token');
          console.log('Token from local storage:', storedToken);

          let headers;
          if(window.location.reload){
            headers = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${storedToken}`
            };
          } else{
            headers = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            };
          }

          const GetUserById = await fetch(`http://localhost:3000/info/users/${id}`, { 
            headers: headers });
          const result = await GetUserById.json();
          console.log(result);
          return result;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }
  ])

  return (
    
      <div style={{backgroundColor: "aliceblue", minHeight: "100vh"}}>
        <RouterProvider router={router} />
      </div>
      
  )
}

export default App;

