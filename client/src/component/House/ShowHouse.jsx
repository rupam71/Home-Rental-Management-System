import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { showHouse } from '../../actions/findHouse';
import { userProfile, deleteHouse, createBookmark, removeBookmark } from './../../actions/findHouse';
import { Link } from 'react-router-dom';
import CreateReview from './CreateReview';
import ShowReview from './ShowReview';
import { getHouseReview } from '../../actions/review';
import { createRent } from '../../actions/rent';
import { Carousel, OverlayTrigger, Tooltip } from 'react-bootstrap'

import axios from 'axios';

const ShowHouse = () => {
    const dispatch = useDispatch()
    const houseData = useSelector(state => state.house)
    const user = useSelector(state => state.auth.user)

    let userId,bookmarkLength
    if (user) {
        userId = user._id 
        bookmarkLength = user.bookmarkedHouse.length
    }

    const houseId = useParams().id

    useEffect(() => {
        async function fetchData() {
        await dispatch(showHouse(houseId))
        dispatch(getHouseReview(houseId))
        }
        fetchData();
        // eslint-disable-next-line
    }, [houseId]);

    const [index, setIndex] = useState(0);
    const [bookmarkedAlready, setbookmarkedAlready] = useState(false);
    useEffect(() => {
        setbookmarkedAlready(false)
        if(user) user.bookmarkedHouse.forEach(element=>{
            if(element===houseId) {
                setbookmarkedAlready(true)
            }
        })
        // eslint-disable-next-line
    }, [bookmarkLength]);
    useEffect(() => {
        dispatch(userProfile(houseData[0].houseOwnerId))
        // eslint-disable-next-line
    }, [houseData]);

    const [houseImagesLink] = useState([])
    let length
    if(houseData[0])  length = houseData[0].houseImagesLength
    useEffect(() => {
        async function fetchData() {
            if (length !== 0) {
                for (let i = 0; i < length; i++) {
                    const blob = await axios.get(`/api/house/${houseData[0]._id}/picture/${i}`, { responseType: 'blob', contentType: "image/jpeg" }).then(r => r.data);
                    var blobFile = await blob.slice(0, blob.size, 'image/jpeg')
                    var newFile = await new File([blobFile], 'name.jpeg', { type: 'image/jpeg' })
                    const localImageUrl = window.URL.createObjectURL(newFile)
                    houseImagesLink.push(localImageUrl)
                }
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [length]);

    const houseOwner = useSelector(state => state.user)
    
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
           {bookmarkedAlready ? 'Removed Bookmark' : 'Added Bookmark'}
        </Tooltip>
      );

    const bookmarkRender = () => {
        if(bookmarkedAlready) return <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <Link to='#' onClick={() => dispatch(removeBookmark(houseId))}
                className="btn rent-button btn-lg bg-dark" style={{color:'blue'}}
                ><i class="fas fa-bookmark"/></Link> 
        </OverlayTrigger>
        else {
            return <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <Link to='#' onClick={() => dispatch(createBookmark(houseId))}
                    className="btn rent-button btn-lg bg-light" style={{color:'black'}}
                    ><i class="fas fa-bookmark"/></Link>
            </OverlayTrigger>
        }
    }
    const rentButtonRender = () => {
        if (user && houseData[0].houseOwnerId !== userId && houseData[0].houseStatus === 'available') return <div className="dropdown d-flex justify-content-end mt-2 mx-4">
        <Link onClick={() => dispatch(createRent({ houseId }))}
            className="btn rent-button container-fluid btn-lg"
        >Rent This House</Link>
        <br/>
        {bookmarkRender()}
    </div>
        else return <div></div> 
    }
    const dropdownRender = () => {
        if (user && houseData[0].houseStatus === 'available' && houseData[0].houseOwnerId === userId) return <div className="dropdown dropdown d-flex justify-content-end">
            <button className="dropbtn"><h2><i className="fas fa-sliders-h" /></h2></button>
            <div className="dropdown-content">
                <div className='text-center'>
                    <Link to={`/edithouse/${houseData[0]._id}`} className='item'>Edit House</Link>
                </div>
                <div className='text-center'>
                    <Link to={`/uploadhouseimage/${houseData[0]._id}`} className='item'>Mange Image</Link>
                </div>
                <div className='text-center'>
                    <Link to='' className='item'
                        onClick={() => dispatch(deleteHouse(houseData[0]._id))}
                    >Delete House</Link>
                </div>
            </div>
        </div>
        else return <div></div>
    }
    const HousePictureRender = (number, id) => {
        const handleSelect = (selectedIndex, e) => {
            setIndex(selectedIndex);
        };
        return ( <div style={{maxWidth:'1000px', margin:'auto'}}>
            <Carousel activeIndex={index} onSelect={handleSelect} style={{ color: 'black' }}>
                {number && [...Array(number)].map((num, index) => {
                    return <Carousel.Item key={index} interval={2000}>
                        <img
                            className="d-block w-100"
                            src={houseImagesLink[index]}
                            alt={`${index + 1} Slide`}
                        />
                    </Carousel.Item>
                })}
            </Carousel>
            </div>
        );
    }

    return (
        <div className='container-fluid showHouse'>
            <div className="row">
                <div className="col-md-8 col-lg-9 house-info">
                    <h1 className='text-center'>Your House Here</h1>
                    {houseData.map(house => {
                        return <div key={house._id}>
                            {HousePictureRender(house.houseImagesLength, house._id)}
                            <div className="row my-4">
                                <div className="col-10">
                                    <h2>{house.houseAddress}</h2>
                                    <h4 className="card-text">{house.description}</h4>
                                </div>
                                <div className="col-2">
                                    {dropdownRender()}
                                </div>
                                {rentButtonRender()}
                            </div>

                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td className='text-center col-6'>{house.totalRoomNo} Room</td>
                                        <td className='text-center col-6'>{house.bedRoom} BedRoom</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center col-6'>{house.totalToilet} Toilet</td>
                                        <td className='text-center col-6'>{house.totalbalcony} Balcony</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center col-6'>{house.size} Area Sq/M</td>
                                        <td className='text-center col-6'>{house.rentFee} Per Month</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center col-6'>{house.addittionalCharge} Per Month</td>
                                        <td className='text-center col-6'>{house.totalView} Time Viewd</td>
                                    </tr>
                                    <tr>
                                        <td className='text-center col-6'>{house.totalRented} Time Rented</td>
                                        <td className='text-center col-6'>Create At {house.createdAt.slice(0, 9)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    })}

                    <ShowReview
                        houseId={houseId}
                        userId={userId}
                        houseOwnerId={houseData[0].houseOwnerId}
                    />

                    {!user ? '' : <CreateReview
                        houseId={houseId}
                    />}

                </div>
                <div className="col-md-4 col-lg-3 houseowner-info">
                    <h1 className='text-center'>House Owner</h1>
                    {houseOwner.map(user => {
                        return <div key={user._id}>
                            <h2 className="">{user.name}</h2>
                            <h3 className="">{user.email}</h3>
                            <h3 className="">Phone : {user.phoneNumber}</h3>
                            <h3 className="">Address : {user.address}</h3>
                            <h3 className="">Gender : {user.gender}</h3>
                            <h3 className="">Date Of Birth : {user.dateOfBirth}</h3>
                            <div className='text-center my-5'>
                                <Link to={`/user/${user._id}`} className='btn btn-primary btn-lg'>
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ShowHouse;