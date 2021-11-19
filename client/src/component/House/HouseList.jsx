import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HouseList = ({headline}) => {
    const houses = useSelector(state => state.house)
    
    const houseStatusUpdate = (status) => {
        if(status==='available') return 'Available For Rent'
        else return 'House Already Rented'
    }

    const headlineRender =()=> {
        if(houses.length !==0 ) return `${headline}`
        else return `No House Found`
    }

    return (
        <div className='house-list-container'>
            <h1 className="text-center pt-5">{headlineRender()}</h1>
            <div className="row">
                {houses.map(house => { return <div key={house._id} className='house-list-card col-md-6 col-lg-4 col-xl-4'>
                     <div className="card" >
                        <img className="card-img-top mx-auto" src={`/api/house/${house._id}/picture/0`} alt="Card Avatar" style={{width:'100%',margin:'0 0'}} />
                        <div className="card-body">
                            <h3 className="card-title">{house.houseAddress}</h3>
                            <ul className="list-group ">
                                <li className="list-group-item">{house.totalRoomNo} Room</li>
                                <li className="list-group-item ">{house.size} Area Sq/M</li>
                                <li className="list-group-item ">{house.rentFee} Per Month</li>
                                <li className="list-group-item ">{houseStatusUpdate(house.houseStatus)}</li>
                                <li className="list-group-item ">{house.totalView} Time Viewd</li>
                            </ul>
                            <Link to={`/house/${house._id}`} className=" btn btn-primary card-link mt-3 btn-lg">More</Link>
                        </div>
                    </div>
                    </div>
                })}

            </div>
        </div>
    );
}

export default HouseList;