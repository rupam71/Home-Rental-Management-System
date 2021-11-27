import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const HouseList = ({ headline }) => {
    const history = useHistory()
    const houses = useSelector(state => state.house)

    const houseStatusUpdate = (status) => {
        if (status === 'available') return 'Available'
        else return 'Rented'
    }

    return (
        <div className='house-list-container'>
            <h2 className="text-center pt-5">{headline}</h2>
            <div className="row">
                {houses.map(house => {
                    return <div key={house._id} className='house-list-card col-md-6 col-lg-4 col-xl-4'>
                        <div className="card" onClick={() => history.push(`/house/${house._id}`)}>
                            <img className="card-img-top mx-auto" src={`/api/house/${house._id}/picture/0`} alt="Card Avatar" style={{ width: '100%', margin: '0 0' }} />
                            <div className='cardFee'>{house.rentFee} Per Month</div>
                            <div className="card-body">
                                <h5 className="card-title">{house.houseAddress}</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <p>{house.totalRoomNo} Room</p>
                                        <p>{house.size} Sq/M</p>
                                    </div>
                                    <div className="col-6">
                                        <p>{houseStatusUpdate(house.houseStatus)}</p>
                                        <p>{house.totalView} Viewd</p>
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

export default HouseList;