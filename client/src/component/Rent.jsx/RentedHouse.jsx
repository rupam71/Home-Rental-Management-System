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
        <div className="container my-5">
            <h1 className="text-center">{headline()}</h1>
            
            <div className="table-responsive" style={displayRender()}>
                <table className="table table-bordered" style={{backgroundColor:'#F0F0F0'}}>
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">House Address</th>
                            <th scope="col">Room</th>
                            <th scope="col">Area Sq/M</th>
                            <th scope="col">Rent Fee</th>
                            <th scope="col">House Owner</th>
                            <th scope="col">Rented At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rents && rents.map(rent=>{
                            return <tr key={rent._id} className='text-center' style={{cursor:'pointer'}}>
                                    <th scope="row" onClick={()=>history.push(`/house/${rent.houseId._id}`)}><Link to={`/house/${rent.houseId._id}`} className='text-dark'>{rent.houseId.houseAddress}</Link></th>
                                    <td onClick={()=>history.push(`/house/${rent.houseId._id}`)}><Link to={`/house/${rent.houseId._id}`} className='text-dark'>{rent.houseId.totalRoomNo}</Link></td>
                                    <td onClick={()=>history.push(`/house/${rent.houseId._id}`)}><Link to={`/house/${rent.houseId._id}`} className='text-dark'>{rent.houseId.size}</Link></td>
                                    <td onClick={()=>history.push(`/house/${rent.houseId._id}`)}><Link to={`/house/${rent.houseId._id}`} className='text-dark'>{rent.houseId.rentFee}</Link></td>
                                    <td onClick={()=>history.push(`/user/${rent.houseOwnerId._id}`)}>
                                        <Link to={`/user/${rent.houseOwnerId._id}`} className='text-dark'>
                                            <button className="btn btn-primary btn-sm container-fluid">{rent.houseOwnerId.name}</button>
                                        </Link>
                                    </td>
                                    <td onClick={()=>history.push(`/house/${rent.houseId._id}`)}><Link to={`/house/${rent.houseId._id}`} className='text-dark'>{rent.createdAt.slice(0,10)}</Link></td>
                                </tr>
                            
                        })}
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default RentedHouse;