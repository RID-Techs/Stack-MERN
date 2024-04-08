import { useState, useEffect } from 'react'
import './Home.css'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectToken } from './TokenSlice';
export function Home (){
    const [fields, setFields] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate()
    const AlertField = () => {
        setFields(false)
    }

    const token = useSelector(selectToken);
    const storedToken = localStorage.getItem('token');
    console.log('Token from local storage:', storedToken);
    
        const handleSubmit = (e) => {
            e.preventDefault();

        const surName = document.getElementById("Surname")
        const firstName = document.getElementById("Firstname")
        const age = document.getElementById("Age")
        const profession = document.getElementById("Profession")
        const description = document.getElementById("Description")
        const country = document.getElementById("Country")
        const city = document.getElementById("City")

        if(surName.value === "" || 
        firstName.value === "" || 
        age.value === "" || 
        profession.value === "" ||
        description.value === "" ||
        country.value === "" ||
        city.value === ""){
            setFields(true)
        } else {
            setFields(false)
            const PostData = async() =>{
                try {
                    const headers = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storedToken || token}`
                    }
                    const SendData = await fetch("http://localhost:3000/info", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(
                        {
                            Surname: surName.value,
                            Firstname: firstName.value, 
                            Age: age.value, 
                            Profession: profession.value,
                            Description: description.value,
                            Country: country.value,
                            City: city.value
                        })
                    })

                    if(SendData.ok){
                        setShowSuccessMessage(true)
                        surName.value = ""
                        firstName.value = ""
                        age.value = ""
                        profession.value = ""
                        description.value = ""
                        country.value = ""
                        city.value = ""
                    } else{
                        console.error('Failed to submit form data');
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            PostData();
        }

        }

        useEffect(() => {
            // Check if the condition is fulfilled (showSuccessMessage is true)
            if (showSuccessMessage) {
              // If condition is fulfilled, trigger the modal to show
              const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
              modal.show();
            }
          }, [showSuccessMessage])

          const handleDeconnect = () => {
            localStorage.removeItem('token')
            navigate("/")
          }
    
    return <div>
        <div className='container-fluid'>

        <ul className="nav nav-tabs position-sticky top-0" style={{backgroundColor: "aliceblue"}}>
            <li className="nav-item">
                <Link className='nav-link active' aria-current="page" to={"/home"}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to={"/info/users"}>Get All Users</Link>
            </li>
            <li className="nav-item">
                <button onClick={handleDeconnect} type="button">
                    Log out
                </button>
            </li>
        </ul>


        <div className='d-flex gap-3 justify-content-between flex-wrap mt-2'>
                    
                    <h1>Welcome</h1>
            <h1 style={{fontStyle: "italic"}}>Introduce Yourself !</h1>
        </div>
            <hr className="border border-danger border-2 opacity-50"/>
                    <h2 className='text-center'>Fill in this form !</h2>
            <hr />
            <div className='container'>


           {fields && <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center mandatory" role="alert">
  <div>
  All fields are mandatory
  </div>
  <button type="button" className="btn-close" 
  data-bs-dismiss="alert" aria-label="Close" onClick={AlertField}></button>
</div>}


                
                <form className="form-container">
                    <div className='row row-cols-lg-3 g-4'>

                    <div className="col">
                    <label htmlFor="Surname">Name : </label>
                    <input className='ms-2' id="Surname" type="text" placeholder="Surnamame..." autoComplete='nope'/>
                    </div>

                    <div className="col">
                    <label htmlFor="Firstname">Firstname : </label>
                    <input className='ms-2' id="Firstname" type="text" placeholder="Firstname..." autoComplete='nope'/>
                    </div>

                    <div className="col">
                    <label htmlFor="Age">Age : </label>
                    <input className='ms-2' id="Age" type="text" placeholder="Age..." autoComplete='nope'/>
                    </div>

                    <div className="col">
                    <label htmlFor="Profession">Profession : </label>
                    <input className='ms-2' id="Profession" type="text" placeholder="Profession..." autoComplete='nope'/>
                    </div>


                    <div className="col">
                    <label htmlFor="Country">Country : </label>
                    <input className='ms-2' id="Country" type="text" placeholder="Country..." autoComplete='nope'/>
                    </div>

                    <div className="col">
                    <label htmlFor="City">City : </label>
                    <input className='ms-2' id="City" type="text" placeholder="City..." autoComplete='nope'/>
                    </div>

                    <div className="col">
                    <label htmlFor="Description">Description : </label>
                    <textarea className='ms-2 mt-1' name="" id="Description" cols="30" rows="5" placeholder='Description...' autoComplete='nope'/>
                    </div>

                    <div className="col d-inline-flex align-items-center">
                    <button className='' id='submit' type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                    </div>
                    
                </form>
                
    
                <div>
                    {showSuccessMessage && <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{ <p>Welcome to you !</p> }</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body bg-success-subtle text-success-emphasis">
      You are successfully added !
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Thanks</button>
      </div>
    </div>
  </div>
</div> }
                </div>
            </div>
        </div>
    </div>
}