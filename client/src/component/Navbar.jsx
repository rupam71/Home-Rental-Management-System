import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout, logoutAll } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'


const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const state = useSelector(state => state)

    const [collupseNavbarState, setcollupseNavbarState] = useState('down');
    const handleCollupseNavbar = () => {
        if(collupseNavbarState==='down') setcollupseNavbarState('up')
        else setcollupseNavbarState('down')
    }

    // console.log("State ::: ", state)
    // console.log("User ::: ", user)


    const rendernavbar = () => {
        if (user) {
            return (
                <React.Fragment> 
                    <li className="nav-item">
                        <Link className="nav-link" to="/createhouse">Create House</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">{user.name}</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href='*' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Settings
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="" onClick={() => dispatch(logout())}>Logout From This Device</Link>
                            <Link className="dropdown-item" to="" onClick={() => dispatch(logoutAll())}>Logout From All Device</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/support" >Support Ticket</Link>
                        </div>
                    </li>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li><li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </React.Fragment>
            )
        }
    }


    return (
        <div>
            <nav className="navbar navbar-expand-md bg-dark fixed-top">
                <div className='container'>
                <Link className="navbar-brand" to="/">Bari Bhara Chai</Link>
                <button onClick={handleCollupseNavbar} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className={`fas fa-chevron-circle-${collupseNavbarState}`} style={{fontSize:'3rem'}} />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/findhouse">Find House</Link>
                        </li>
                        {rendernavbar()}
                    </ul>
                </div></div>
            </nav>
        </div>
    )
}

export default Navbar;
