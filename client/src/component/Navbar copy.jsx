import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout, clearMessage, login, logoutAll } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'


const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const state = useSelector(state => state)

    const [collupseNavbarState, setcollupseNavbarState] = useState(false);


    console.log("collupseNavbarState ::: ", collupseNavbarState)
    console.log("State ::: ", state)
    console.log("User ::: ", user)



    const collupseNavbar = () => setcollupseNavbarState(true)
    const closeColupsableNavbar = () => setcollupseNavbarState(false)

    const rendernavbar = () => {
        if (user) {
            return (
                <div className="navItemContainer">
                    <Link to="" className="closeColupsableNavbar" onClick={closeColupsableNavbar} > x </Link>
                    <Link to="/findhouse" className="link" >Find House</Link>
                    <Link to="/createhouse" className="link" >Create House</Link>
                    <Link to="" className="link" onClick={() => dispatch(logout())} >Logout</Link>
                </div>
            )
        } else {
            return (
                <div className="navItemContainer">
                    <Link to="" className="closeColupsableNavbar" onClick={closeColupsableNavbar} > x </Link>
                    <Link to="/findhouse" className="link" >Find House</Link>
                    <Link to="/signup" className="link" >Sign Up</Link>
                    <Link to="/login" className="link" >Login</Link>
                </div>
            )
        }
    }


    return (
        <div>
            <nav className="navbarTop">
                <li><i class="fas fa-map-marker-alt" /> 23/4, Mirpur 12, Dhaka</li>
                <li><i class="fas fa-phone-alt" /> +880 1678 488923</li>
            </nav>
            <nav className="navbarDown">
                <div className="navContainer">
                    <div className='navLink'>
                        <Link to="/" className="link" >Bari Vara Chai</Link>
                    </div>
                    <div className='navItem'>
                        {rendernavbar()}
                    </div>
                    <div className='navCollupse'>
                        {collupseNavbarState
                            ? rendernavbar()
                            : <Link to='' onClick={collupseNavbar}><i className="fas fa-bars" /></Link>
                        }

                    </div>
                </div>
            </nav>



        </div>
    )
}

export default Navbar;
