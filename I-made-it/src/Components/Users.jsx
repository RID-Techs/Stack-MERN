import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Users.css";
import { BallTriangle } from 'react-loader-spinner';
import { Suspense } from "react";

export function Users() {
  const data = useLoaderData();

  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return <div>Error: Data is not available</div>;
  }

  return (
    <div className="container-fluid">
      <ul className="nav nav-tabs position-sticky top-0" style={{backgroundColor: "aliceblue"}}>
        <li className="nav-item">
          <Link className='nav-link' to={"/"}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to={"/home"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link active' aria-current="page" to={"/info/users"}>Get All Users</Link>
        </li>
      </ul>

      <div className="container mt-2">
        <h1>
          Here are all the users, you can share your daily experiences with
          everyone. Let&apos;s get in contact
        </h1>
        <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-4">
          <Suspense fallback={<BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" wrapperStyle={{}} wrapperClass="" visible={true} />}>
            {data.map((data) => (
              <div className="col" key={data._id}>
                <div className="UserDetails">
                  <div className="UserHeader">
                    <p className="Profile"></p>
                    <p className="UserName">{data.Firstname}</p>
                  </div>
                  <div className="UserBody">
                    <p>Name : {data.Surname}</p>
                    <p>Firstname : {data.Firstname}</p>
                    <p>Age : {data.Age}</p>
                    <p>Profession : {data.Profession}</p>
                    <p>Experience : {data.Description}</p>
                  </div>
                  <div className="UserFoot">
                    <p>🏳🚩 Live in {data.City}</p>
                    <p>{data.Country}</p>
                  </div>
                  <div className="AboutUser">
                    <Link to={"/info/users/" + data._id}>
                      <button type="button" className="btn btn-secondary">Get in contact</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

