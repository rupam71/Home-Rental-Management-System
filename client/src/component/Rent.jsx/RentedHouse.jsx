import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRent } from '../../actions/rent';

const RentedHouse = ({userId,userName}) => {
    const dispatch = useDispatch()
    const rents = useSelector(state=>state.rent)
    console.log('rent',rents)
    useEffect(() => {
        dispatch(getAllRent(userId))
        // eslint-disable-next-line
    }, []);

    const headline =()=> {
        if(rents.length !==0 ) return `House Rented By ${userName}`
        else return `${userName} Not Rented Any House Yet`
    }

    return ( 
        <div className="container my-5">
            <h1 className="text-center">{headline()}</h1>
            <div className="row ">
                {rents.map(rent => { return <div key={rent._id} className='rent-list-card col-md-6 col-lg-4'>
                    <div className="card">
                            <div className="card-header text-center">
                                Rented At {rent.createdAt.slice(0,10)}
                            </div>
                            <ul className="list-group list-group-flush text-center">
                                <li className="list-group-item">
                                    <Link to={`/house/${rent.houseId}`} className='btn btn-primary btn-lg'> View This House</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={`/user/${rent.houseOwnerId}`} className='btn btn-primary btn-lg'> View House Owner Profile</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to={`/user/${rent.houseSeekerId}`} className='btn btn-primary btn-lg'> View House Seeker Profile</Link>
                                </li>
                            </ul>
                            </div>
                </div>})}
            </div>
        </div>
     );
}
 
export default RentedHouse;