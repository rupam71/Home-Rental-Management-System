import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRent } from '../../actions/rent';
import { useHistory } from 'react-router';

const RentedHouse = ({userId,userName}) => {
    const dispatch = useDispatch()
    const rents = useSelector(state=>state.rent)
    const user = useSelector(state=>state.auth.user)
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllRent(userId))
        // eslint-disable-next-line
    }, [userId]);

    const headline =()=> {
        if(rents.length !==0 && !user) return `All ${userName} Rented House`
        else if(rents.length !==0 && user && user.name===userName) return `All Your Rented House`
        else if(rents.length !==0 && user && user.name!==userName) return `All ${userName} Rented House`
        else if(rents.length ===0 && user && user.name===userName) return `You Rent No House Yet`
        else return `${userName} Rent No House Yet`
    }
    const displayRender = () =>{
        if(rents.length ===0) return {display:'none'}
    }
    return (
        <div className='house-list-container'>
            <h2 className="text-center pt-5">{headline()}</h2>
            <div className="row">
                {rents.map(rent => {
                    return <div key={rent._id} className='house-list-card col-md-6 col-lg-4 col-xl-4'>
                        <div className="card" onClick={() => history.push(`/house/${rent.houseId._id}`)}>
                            <img className="card-img-top mx-auto" src={`/api/house/${rent.houseId._id}/picture/0`} alt="Card Avatar" style={{ width: '100%', margin: '0 0' }} />
                            <div className='cardFee'>Rented</div>
                            <div className="card-body">
                                <h5 className="card-title">{rent.houseId.houseAddress}</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <p>{rent.houseId.totalRoomNo} Room</p>
                                        <p>{rent.houseId.size} Sq/M</p>
                                    </div>
                                    <div className="col-6">
                                        <p> Rent at {rent.createdAt.slice(0,10)}</p>
                                        <p> Rent Fee {rent.houseId.rentFee}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    );
}
 
export default RentedHouse;