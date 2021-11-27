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
import findDay from './../../utility/findDay';

const ShowHouse = () => {
    const dispatch = useDispatch()
    const houseData = useSelector(state => state.house)
    const user = useSelector(state => state.auth.user)

    console.log("houseData ::: ",houseData)
    let userId,bookmarkLength,userName
    if (user) {
        userId = user._id 
        bookmarkLength = user.bookmarkedHouse.length
        userName=user.name
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

    
    // eslint-disable-next-line
    const [reRender,setreRender] = useState(null);
    useEffect(() => {
        dispatch(userProfile(houseData[0].houseOwnerId))
        setTimeout(()=>{setreRender({})},500)
        // eslint-disable-next-line
    }, [houseData]);

    const [houseImagesLink,sethouseImagesLink] = useState([])
    console.log('houseImagesLink',houseImagesLink)
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



    const [index, setIndex] = useState(0);
    const [gallaryIndex, setgallaryIndex] = useState(0);
    const handlePrevios = () => {
        if(gallaryIndex-1 !== -1) setgallaryIndex(gallaryIndex-1)
    }
    const handleNext = () => {
        if(length>4 && gallaryIndex+1 !== length-3) setgallaryIndex(gallaryIndex+1)
    }
    
    useEffect(() => {
        if(length<=4) setgallaryIndex(0)
        else if(index>length-4) setgallaryIndex(length-4)
        else setgallaryIndex(index)
    }, [index,length]);
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

    console.log('LENGTH ::: ',length)
    console.log('INDEX ::: ',index)
    console.log('HOUSEIMAGELINK ::: ',houseImagesLink.length)
    console.log('GALLARYINDEX ::: ',gallaryIndex)




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
        if (user && houseData[0].houseOwnerId !== userId && houseData[0].houseStatus === 'available') return <div className="dropdown d-flex justify-content-end my-2 mr-2">
        <Link onClick={() => dispatch(createRent({ houseId }))}
            className="btn btn-primary btn-block"
        >Rent This House</Link>
        <br/>
        {bookmarkRender()}
    </div>
        else return <div></div> 
    }
    const dropdownRender = () => {
        if (user && houseData[0].houseStatus === 'available' && houseData[0].houseOwnerId === userId) return <div className="dropdown dropdown d-flex justify-content-end">
            <button className="dropbtn"><h5><i className="fas fa-sliders-h" /></h5></button>
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
    const HousePictureRender = (number) => {
        console.log(number, " ::: number")
        const handleSelect = (selectedIndex, e) => {
            console.log("setIndex(selectedIndex)",selectedIndex)
            setIndex(selectedIndex);
        };
        return ( <div className='houseCarousel'>
            <Carousel activeIndex={index} onSelect={handleSelect} >
                {number && [...Array(number)].map((num, index) => {
                    return <Carousel.Item key={index} interval={1000000}>
                        <img
                            className="d-block w-100"
                            src={houseImagesLink[index]}
                            alt={`${index + 1} Slide`}
                        />
                    </Carousel.Item>
                })}
            </Carousel>
            <div className="galary">
                <div className="row">
                    <div className="col-1">
                        <i class="fas fa-chevron-circle-left nextPrevious" onClick={handlePrevios}></i>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            {number && [...Array(length>3?4:length)].map((num, index) =>{
                                const picIndex = gallaryIndex+index
                                console.log('picIndex ::: ',picIndex)
                                return <div className="col-3" onClick={()=>setIndex(picIndex)} style={{margin:'0 auto'}}>
                                    <img
                                        className="d-block w-100"
                                        src={houseImagesLink[picIndex]}
                                        alt={`${picIndex + 1} Slide`}
                                    />
                                </div>
                            })}            
                        </div>
                    </div>
                    <div className="col-1">
                        <div style={{width:'10px',height:'100%',margin:'0 auto'}}>
                            <i class="fas fa-chevron-circle-right nextPrevious" onClick={handleNext}></i>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        );
    }
    const HouseProfileList = ({property}) => {
        return <li>
            <i class="fas fa-check"></i>
            <p>{property}</p>
        </li>
    }
    const handleAvailibility = status => {
        if(status === 'available') return 'Available For Rent'
        else return 'This House Already Rented'
    }
    // return (
    //     <div className='container-fluid showHouse'>
    //         <div className="row">
    //             <div className="col-md-8 col-lg-9 house-info">
    //                 <h1 className='text-center'>Your House Here</h1>
    //                 {houseData.map(house => {
    //                     return <div key={house._id}>
    //                         {HousePictureRender(house.houseImagesLength, house._id)}
    //                         <div className="row my-4">
    //                             <div className="col-10">
    //                                 <h5>{house.houseAddress}</h5>
    //                                 <h4 className="card-text">{house.description}</h4>
    //                             </div>
    //                             <div className="col-2">
    //                                 {dropdownRender()}
    //                             </div>
    //                             {rentButtonRender()}
    //                         </div>

    //                         <table className="table table-striped table-hover">
    //                             <tbody>
    //                                 <tr>
    //                                     <td className='text-center col-6'></td>
    //                                     <td className='text-center col-6'></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td className='text-center col-6'></td>
    //                                     <td className='text-center col-6'></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td className='text-center col-6'></td>
    //                                     <td className='text-center col-6'></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td className='text-center col-6'>{house.addittionalCharge} Per Month</td>
    //                                     <td className='text-center col-6'></td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td className='text-center col-6'></td>
    //                                     <td className='text-center col-6'></td>
    //                                 </tr>
    //                             </tbody>
    //                         </table>
                            
    //                     </div>
    //                 })}

    //                 <ShowReview
    //                     houseId={houseId}
    //                     userId={userId}
    //                     houseOwnerId={houseData[0].houseOwnerId}
    //                 />

    //                 {!user ? '' : <CreateReview
    //                     houseId={houseId}
    //                 />}

    //             </div>
    //             <div className="col-md-4 col-lg-3 houseowner-info">
    //                 <h1 className='text-center'>House Owner</h1>
    //                 {houseOwner.map(user => {
    //                     return <div key={user._id}>
    //                         <h5 className="">{user.name}</h5>
    //                         <h3 className="">{user.email}</h3>
    //                         <h3 className="">Phone : {user.phoneNumber}</h3>
    //                         <h3 className="">Address : {user.address}</h3>
    //                         <h3 className="">Gender : {user.gender}</h3>
    //                         <h3 className="">Date Of Birth : {user.dateOfBirth}</h3>
    //                         <div className='text-center my-5'>
    //                             <Link to={`/user/${user._id}`} className='btn btn-primary btn-lg'>
    //                                 View Profile
    //                             </Link>
    //                         </div>
    //                     </div>
    //                 })}
    //             </div>
    //         </div>
    //     </div>
    // );
    const HouseInfo = () => {
        return <div className="houseInfo">
            <div className="row">
                <div className="col-10">
                    <h4>{houseData[0].houseAddress}</h4>
                </div>
                <div className="col-2">
                    {dropdownRender()}
                </div>
            </div>
            <p>{houseData[0].description}</p>
            <h5>Features</h5>
            <div className="row">
                <div className="col-6">
                    <ul>
                        <HouseProfileList 
                        property={`${houseData[0].totalRoomNo} room`} />
                        <HouseProfileList 
                        property={`${houseData[0].totalToilet} Toilet`} />
                        <HouseProfileList 
                        property={`${houseData[0].size} Area Sq/M`} />
                        <HouseProfileList 
                        property={`${houseData[0].totalView} Time Viewd`} />
                        <HouseProfileList 
                        property={handleAvailibility(houseData[0].houseStatus)} />
                    </ul>
                </div>
                <div className="col-6">
                    <ul>
                        <HouseProfileList 
                        property={`${houseData[0].bedRoom} BedRoom`} />
                        <HouseProfileList 
                        property={`${houseData[0].totalbalcony} Balcony`} />
                        <HouseProfileList 
                        property={`${houseData[0].totalRented} Time Rented`} />
                        <HouseProfileList 
                        property={`${houseData[0].bookmarkedBy.length} User Bookmarked`} />
                        <HouseProfileList 
                        property={`House created at ${findDay(houseData[0].createdAt.slice(0, 10))}`} />
                    </ul>
                </div>
            </div>
            <h5>Rent Fee</h5>
            <div className="price">
                <span className="signPrice">Tk</span>
                <span className="mainPrice">{houseData[0].rentFee}</span>
                <span className="decPrice">/per month</span>
            </div>
            <h5>+ Additional <span className="addPrice">{houseData[0].addittionalCharge}</span>/per month</h5>
            {rentButtonRender()}
        </div>
    } 

    return(
        <div className="container showHouse">
            <div className="row">
                <div className="col-md-7 col-xl-7">
                    <div className="row">
                        <div className="col-12">
                            <div className="slick-gallery">
                                {HousePictureRender(houseData[0].houseImagesLength)} 
                            </div>
                            <div className="houseInfoSmallScreen px-3">
                                <HouseInfo />
                            </div>
                            <ShowReview houseId={houseId} userId={userId}
                                houseOwnerId={houseData[0].houseOwnerId}
                            />
                            {!user ? '' : <CreateReview houseId={houseId} userName={userName}/>}
                        </div>
                    </div>
                    {/* <div className="slick-gallery">
                        {HousePictureRender(houseData[0].houseImagesLength)}

                        {/* <ShowReview houseId={houseId} userId={userId}
                            houseOwnerId={houseData[0].houseOwnerId}
                        />
                        {!user ? '' : <CreateReview houseId={houseId} />} 
                    </div> */}
                </div>
                <div className="col-md-5 col-xl-5">
                    <div className="houseInfoBigScreen">
                        <HouseInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowHouse;

