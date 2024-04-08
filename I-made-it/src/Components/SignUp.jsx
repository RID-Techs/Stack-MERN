import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export function SignUp () {
    const stylo = {
        display: "flex",  
        flexDirection: 'column',  
        justifyContent: "center",
        gap: "1em"
    }
    
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        const email = document.getElementById("email")
        const password = document.getElementById("password")

        if(email === "" || password === "") {
            alert("All fiels required !")
        } else{
            const SigningUp = async() => {
                try {
                    const signUpTo = await fetch("http://localhost:3000/auth/signup", {
                        method : "POST",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                        email: email.value,
                        password: password.value
                        })

                    })
                    if(signUpTo.ok){
                        alert("User Connected")
                        navigate("/home")
                    } else{
                        alert("Failed to connect the user")
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            SigningUp();
        }
    }

    return <>
    <div className="container-fluid">
        <ul className="nav nav-tabs position-sticky top-0" style={{backgroundColor: "aliceblue"}}>
            <li className="nav-item">
                <Link className='nav-link active' aria-current="page" to={"/"}>Login</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to={"/home"}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to={"/info/users"}>Get All Users</Link>
            </li>
        </ul>
    </div>


    <div className="container">
        <h1 className="text-center">Sign Up</h1>
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