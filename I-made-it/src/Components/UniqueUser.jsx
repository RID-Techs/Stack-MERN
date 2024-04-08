import { useSelector } from "react-redux";
import { selectToken } from "./TokenSlice";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useEffect } from "react";

export function OneUser() {
  const token = useSelector(selectToken);

  // Log the token retrieved from local storage
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     console.log("Token from local storage:", storedToken);
//   }, []);


  const data = useLoaderData();
  const { id } = useParams();

  // **************** Inputs  for editing user info *****************************

  const [surnameValue, setSurnameValue] = useState(data.Surname);
  const ModifySurname = (e) => {
    setSurnameValue(e.target.value);
  };
  const [firstnameValue, setFirstnameValue] = useState(data.Firstname);
  const ModifyFirstname = (e) => {
    setFirstnameValue(e.target.value);
  };
  const [ageValue, setAgeValue] = useState(data.Age);
  const ModifyAge = (e) => {
    setAgeValue(e.target.value);
  };
  const [professionValue, setProfessionValue] = useState(data.Profession);
  const ModifyProfession = (e) => {
    setProfessionValue(e.target.value);
  };
  const [descriptionValue, setDescriptionValue] = useState(data.Description);
  const ModifyDescription = (e) => {
    setDescriptionValue(e.target.value);
  };
  const [countryValue, setCountryValue] = useState(data.Country);
  const ModifyCountry = (e) => {
    setCountryValue(e.target.value);
  };
  const [cityValue, setCityValue] = useState(data.City);
  const ModifyCity = (e) => {
    setCityValue(e.target.value);
  };

  // **************** Inputs  for editing user info *****************************

  const [Notmodify, setNotModify] = useState(true);
  const [modifyProcess, setModifyProcess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  console.log(Notmodify);

  const ProcessTrue = () => {
    setModifyProcess(true);
  };
  const handleModify = () => {
    setNotModify(false);
    ProcessTrue();
  };

  const UniqUser = () => {
    setNotModify(true);
    setModifyProcess(false);
  };

  const handleModifyInfos = (e) => {
    e.preventDefault();

    const surName = document.getElementById("Surname");
    const firstName = document.getElementById("Firstname");
    const age = document.getElementById("Age");
    const profession = document.getElementById("Profession");
    const description = document.getElementById("Description");
    const country = document.getElementById("Country");
    const city = document.getElementById("City");

    if (
      surName.value === "" ||
      firstName.value === "" ||
      age.value === "" ||
      profession.value === "" ||
      description.value === "" ||
      country.value === "" ||
      city.value === ""
    ) {
      alert("Please fill all fields");
    } else {
      const ModifyData = async () => {
        try {
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

          const UpdatedData = await fetch(
            `http://localhost:3000/info/users/${id}`,
            {
              method: "PUT",
              headers: headers,
              body: JSON.stringify({
                Surname: surName.value,
                Firstname: firstName.value,
                Age: age.value,
                Profession: profession.value,
                Description: description.value,
                Country: country.value,
                City: city.value,
              }),
            }
          );

          if (UpdatedData.ok) {
            setShowSuccessMessage(true);
            setTimeout(() => {
              setNotModify(true);
              setModifyProcess(false);
              window.location.reload();
            }, 2000);
          } else {
            console.error("Failed to Update User Infos...");
          }
        } catch (error) {
          console.error(error);
        }
      };
      ModifyData();
    }
  };

  const [deleteUser, setDeleteUser] = useState(false);
  const [deletetAlert, setDeleteAlert] = useState(false);
  const makeItTrue = () => {
    setDeleteUser(true);
  };

  const handleDelete = () => {
    console.log(deleteUser);
    if (deleteUser) {
      setDeleteAlert(true);
      const DataDeleted = async () => {
        try {
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

          const DeleteData = await fetch(
            `http://localhost:3000/info/users/${id}`,
            {
              method: "DELETE",
              headers: headers,
            }
          );

          if (DeleteData.ok) {
            setNotModify(false);
          } else {
            console.log("Failed to deleted User...");
          }
        } catch (error) {
          console.error(error);
        }
      };
      DataDeleted();
    } else {
      return null;
    }
  };

  return (
    <div className="container-fluid">
      <ul
        className="nav nav-tabs position-sticky top-0"
        style={{ backgroundColor: "aliceblue" }}
      >
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to={"/info/users"}>
            Get All Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/logout"}>
            Log out
          </Link>
        </li>
      </ul>

      <div className="container">
        <h1>Unique User</h1>

        {deletetAlert && (
          <div
            style={{
              color: "darkred",
              backgroundColor: "lightred",
              padding: "1em",
              borderRadius: "10px ",
            }}
          >
            User deleted Successfully !
          </div>
        )}

        <div className="row row-cols-1">
          <div className="col-lg-5">
            {Notmodify && (
              <div className="UserDetails" key={data._id}>
                <div className="UserHeader">
                  <p className="Profile"></p>
                  <p className="UserName">{data.Surname}</p>
                </div>
                <div className="UserBody">
                  <p>Name : {data.Surname}</p>
                  <p>Firstname : {data.Firstname}</p>
                  <p>Age : {data.Age}</p>
                  <p>Profession : {data.Profession}</p>
                  <p>Experience : {data.Description}</p>
                </div>
                <div className="UserFoot">
                  <p> 🏳🚩 Live in {data.City}</p>
                  <p>{data.Country}</p>
                </div>
                <div className="AboutUser d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleModify}
                  >
                    Modify
                  </button>
                  <button
                    type="button"
                    onClick={makeItTrue}
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Delete My Account !
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">Are you sure ?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        {modifyProcess && (
          <div>
            {showSuccessMessage && (
              <div
                style={{
                  color: "black",
                  backgroundColor: "lightblue",
                  padding: "1em",
                  borderRadius: "10px ",
                }}
              >
                User Infos modified Successfully !
              </div>
            )}

            <button type="button" onClick={UniqUser}>
              Back
            </button>

            <div>
              <form className="form-container">
                <label htmlFor="Surname">Name: </label>
                <input
                  id="Surname"
                  type="text"
                  placeholder="Surnamame..."
                  autoComplete="nope"
                  value={surnameValue}
                  onChange={ModifySurname}
                />
                <label htmlFor="Firstname">Firstname: </label>
                <input
                  id="Firstname"
                  type="text"
                  placeholder="Firstname..."
                  autoComplete="nope"
                  value={firstnameValue}
                  onChange={ModifyFirstname}
                />
                <label htmlFor="Age">Age: </label>
                <input
                  id="Age"
                  type="text"
                  placeholder="Age..."
                  autoComplete="nope"
                  value={ageValue}
                  onChange={ModifyAge}
                />
                <label htmlFor="Profession">Profession: </label>
                <input
                  id="Profession"
                  type="text"
                  placeholder="Profession..."
                  autoComplete="nope"
                  value={professionValue}
                  onChange={ModifyProfession}
                />
                <label htmlFor="Description">Description: </label>
                <textarea
                  name=""
                  id="Description"
                  cols="30"
                  rows="10"
                  placeholder="Description..."
                  autoComplete="nope"
                  value={descriptionValue}
                  onChange={ModifyDescription}
                />
                <label htmlFor="Country">Country: </label>
                <input
                  id="Country"
                  type="text"
                  placeholder="Country..."
                  autoComplete="nope"
                  value={countryValue}
                  onChange={ModifyCountry}
                />
                <label htmlFor="City">City: </label>
                <input
                  id="City"
                  type="text"
                  placeholder="City..."
                  autoComplete="nope"
                  value={cityValue}
                  onChange={ModifyCity}
                />
                <button id="submit" type="submit" onClick={handleModifyInfos}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
