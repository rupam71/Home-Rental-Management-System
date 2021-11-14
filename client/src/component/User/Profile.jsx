import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile, houseListById } from './../../actions/findHouse';
import { Link } from 'react-router-dom';
import { deleteProfileForm } from '../../actions';
import HouseList from '../House/HouseList';
import RentedHouse from '../Rent.jsx/RentedHouse';

const Profile = () => {
    const id = useParams().id
    const location = useLocation()
    const dispatch = useDispatch();
    const ownProfile = useSelector(state => state.auth.user)
    const usersProfile = useSelector(state => state.user[0])
    const url = useSelector(state => state.image.url)
    let user;
    let imageSrc;
    
    useEffect(() => {
        if (id) dispatch(userProfile(id))
        // eslint-disable-next-line
    }, [location.pathname]);
    
    useEffect(() => {
        if (id) dispatch(houseListById(id))
        else if(ownProfile) dispatch(houseListById(ownProfile._id))
        // eslint-disable-next-line
    }, [location.pathname]);

    if (id) user = usersProfile
    else user = ownProfile

    if(!url && user) imageSrc = `http://localhost:3000/api/users/${user._id}/avatar`
    else imageSrc = url
   
    const imageRender = () => {
        return <div className="container-fluid text-center">
            <img src={imageSrc} style={{border:'10px solid #e0d7d7'}} alt='Nothing Found' />
        </div> 
    }

    const ownProfileRender = () => {
        if (id) return <div></div>
        else return <div className="row my-3">
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='/createhouse' className='btn btn-primary btn-lg container-fluid'>Create Your House</Link>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='/editprofile' className='btn btn-primary btn-lg container-fluid'>Edit Profile</Link>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='/uploadprofileimage' className='btn btn-primary btn-lg container-fluid'>Profile Picture</Link>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='' onClick={() => dispatch(deleteProfileForm())}
                        className='btn btn-primary btn-lg container-fluid'>Delete Account</Link>
                </div>
            </div>
        </div>
    }

    if (!user) return <div></div>
    return <div>
        {imageRender()}
        <div className='container profile-info'>
            <div className="row">
                <div className="col-md-6 text-center mb-3">
                    <h3>Name : {user.name}</h3>
                    <h3>Address : {user.address}</h3>
                    <h3>Email : {user.email}</h3>
                    <h3>Phone Number : {user.phoneNumber}</h3>
                </div>
                <div className="col-md-6 text-center">
                    <h3>Date Of Birth : {user.dateOfBirth}</h3>
                    <h3>Gender : {user.gender}</h3>
                    <h3>User Type : {user.userType}</h3>
                    <h3>Account Created : {user.createdAt.slice(0, 9)}</h3>
                </div>
            </div>
            {ownProfileRender()}
        </div>
        <HouseList
            headline='All Your House' />

        <RentedHouse
            userId={user._id}
            userName={user.name}
        />
    </div>


}

export default Profile;