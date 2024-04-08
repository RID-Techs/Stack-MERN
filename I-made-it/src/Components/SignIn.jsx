import { useDispatch } from 'react-redux';
import { setToken } from './TokenSlice';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom" 

export function SignIn () {
    const dispatch = useDispatch();

    const stylo = {
        display: "flex",  
        flexDirection: 'column',  
        justifyContent: "center",
        gap: "1em"
    }
    const [modal, setModal] = useState(false);
    const modifyModal = () => {
        setModal(false)
    }
    
    const handleSignUp = (e) => {
        e.preventDefault()
        const email = document.getElementById("email")
        const password = document.getElementById("password")
        if(email.value === "" || password.value === "") {
            setModal(true)
        } else{
            const SigningIn = async() => {
                try {
                    const signInTo = await fetch("http://localhost:3000/auth/signin", {
                        method : "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        email: email.value,
                        password: password.value
                        })

                    })
                    if(signInTo.ok){
                        const response = await signInTo.json(); // Parse the response as JSON
                        const token = response.token; // Extract the token from the response
                         // Store token in local storage
                        localStorage.setItem('token', token);
                        
                        dispatch(setToken(token));
                        console.log(token)
                         // Now you can include the token in the Authorization header
                        // const headers = {
                        //     "Content-Type": "application/json",
                        //     "Authorization": `Bearer ${token}` // Include token in the Authorization header
                        // };

                        window.location.replace("/info/users")
                    } else{
                        alert("Failed to connect the user")
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            SigningIn();
        }
    }

    useEffect(() => {
        // Check if the condition is fulfilled (showSuccessMessage is true)
        if (modal) {
          // If condition is fulfilled, trigger the modal to show
            const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
            modal.show();
        }
    }, [modal])

    return <>
    <div className="container-fluid">
        <ul className="nav nav-tabs position-sticky top-0" style={{backgroundColor: "aliceblue"}}>
            <li className="nav-item">
                <Link className='nav-link active' aria-current="page" to={"/signup"}>Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to={"/home"}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to={"/info/users"}>Get All Users</Link>
            </li>
        </ul>
    </div>

    {modal && <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{ <p>Error !</p> }</h1>
        <button type="button" onClick={modifyModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body bg-danger-subtle text-danger-emphasis">
      Email or Password is not correct ! Or if you are a new User, please sign up first.
      </div>
      <div className="modal-footer">
        <button type="button" onClick={modifyModal} className="btn btn-secondary" data-bs-dismiss="modal">OK</button>
        <Link to={"/signup"}>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Sign Up</button>
        </Link>
      </div>
    </div>
  </div>
</div> }

    <div className="container">
        <h1 className="text-center">Login Page</h1>
        <div className="row row-cols-1 mt-4">
            <div className="col">
                <form style={stylo} className="fillForm">
                    <label htmlFor="email">Email : </label>
                    <input style={{border: "1px solid silver", 
                        outline: "none",
                        padding: "1em",
                        borderRadius: "10px",
                        fontSize: "1.1rem",
                        boxShadow: "0px 0px 2px red"}} 
                        type="email" id="email" placeholder="Enter your Email..."/>

                    <label htmlFor="password">Password : </label>
                    <input style={{border: "1px solid silver", 
                        outline: "none",
                        padding: "1em",
                        borderRadius: "10px",
                        fontSize: "1.1rem",
                        boxShadow: "0px 0px 2px red"}} 
                        type="password" id="password" placeholder="Enter a strong password.." />

                        <button style={{
                            outline: "none",
                            border: "1px solid blue",
                            borderRadius: "10px",
                            padding: "0.5em",
                            fontSize: "1rem",
                            backgroundColor: "beige"
                        }} 
                        type="button" onClick={handleSignUp}>Login</button>
                </form>
            </div>
        </div>
    </div>

    </>
}