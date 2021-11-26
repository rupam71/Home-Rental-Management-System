import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile, houseListById } from './../../actions/findHouse';
import { Link } from 'react-router-dom';
import { deleteProfileForm } from '../../actions';
import RentedHouse from '../Rent.jsx/RentedHouse';
import HouseList from '../House/HouseList';

const Profile = () => {
    const id = useParams().id
    const location = useLocation()
    const dispatch = useDispatch();
    const ownProfile = useSelector(state => state.auth.user)
    const usersProfile = useSelector(state => state.user[0])
    const url = useSelector(state => state.image.url)
    const houses = useSelector(state => state.house)
    let user;
    let imageSrc;
    const history = useHistory()

    useEffect(() => {
        if (id) dispatch(userProfile(id))
        // eslint-disable-next-line
    }, [location.pathname]);

    if (id) user = usersProfile
    else user = ownProfile

    useEffect(() => {
        if(user) dispatch(houseListById(user._id))
        // eslint-disable-next-line
    }, [location.pathname,user]);

    if (!url && user) imageSrc = `/api/users/${user._id}/avatar`
    else imageSrc = url
    const displayRender = () =>{
        if(houses && houses.length ===0) return {display:'none'}
    }
    const headline =(name)=> {
        if(houses.length !==0 && id) return `All ${name} House`
        else if(houses.length ===0 && id) return `${name} Have No House`
        else if(houses.length !==0 && !id) return `All Your House`
        else if(houses.length ===0 && !id) return `You Have No House Yet`
    }
    const imageRender = () => {
        return <div className="container-fluid text-center">
            <img src={imageSrc} style={{ border: '10px solid #e0d7d7' }} alt='Nothing Found' />
        </div>
    }

    const ownProfileRender = () => {
        if (id) return <div></div>
        else return <div className="row m-3">
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='/createhouse' className='btn btn-primary btn-block'>Create Your House</Link>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='/editprofile' className='btn btn-primary btn-block'>Edit Profile</Link>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='/uploadprofileimage' className='btn btn-primary btn-block'>Profile Picture</Link>
                </div>
            </div>
            <div className="col-md-3 col-sm-6 p-2">
                <div className='text-center my-2'>
                    <Link to='#' onClick={() => dispatch(deleteProfileForm())}
                        className='btn btn-primary btn-block'>Delete Account</Link>
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
                    <h5>Name : {user.name}</h5>
                    <h5>Address : {user.address}</h5>
                    <h5>Email : {user.email}</h5>
                    <h5>Phone Number : {user.phoneNumber}</h5>
                </div>
                <div className="col-md-6 text-center">
                    <h5>Date Of Birth : {user.dateOfBirth}</h5>
                    <h5>Gender : {user.gender}</h5>
                    <h5>User Type : {user.userType}</h5>
                    <h5>Account Created : {user.createdAt.slice(0, 9)}</h5>
                </div>
            </div>
            {ownProfileRender()}
        </div>
        
        {/* <div className='house-list-container p-5'>
            <h1 className="text-center pt-5">{headline(user.name)}</h1>
            <div className="table-responsive-lg" style={displayRender()}>
                <table className="table table-bordered bg-light">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">House Address</th>
                            <th scope="col">Room</th>
                            <th scope="col">Area Sq/M</th>
                            <th scope="col">Rent Fee</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {houses && houses.map(house=>{
                            return <tr key={house._id} className='text-center text-dark' onClick={()=>history.push(`/house/${house._id}`)}>
                                    <th scope="row">{house.houseAddress}</th>
                                    <td>{house.totalRoomNo}</td>
                                    <td>{house.size}</td>
                                    <td>{house.rentFee}</td>
                                    <td>{house.houseStatus}</td>
                                </tr>
                            
                        })}
                    </tbody>
                </table>
            </div>
        </div> */}

        <HouseList 
        headline={headline(user.name)} />

        <RentedHouse
            userId={user._id}
            userName={user.name}
        />
    </div>


}

export default Profile;