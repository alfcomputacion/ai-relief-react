import React from "react";
import {Link, useLocation} from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand p-2" href="#">AI-RELIEF</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/" style={{ fontWeight: location.pathname === '/' ? '700' : 'normal' }}><span className="sr-only">Home</span></Link>
                {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/summary"  style={{ fontWeight: location.pathname === '/summary' ? '700' : 'normal' }}>Create PDF</Link>
{/*             
                <a className="nav-link disabled" href="#">Disabled</a> */}
            </li>
            </ul>
        </div>
            {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <div>
            <button className="btn btn-outline-success my-2 my-sm-0 inline" type="submit">Search</button>

            </div>
            </form> */}
    </nav>
    </>
  );
};

export default Navbar;