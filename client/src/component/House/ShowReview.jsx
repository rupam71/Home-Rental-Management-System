import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StarRatings from '../../../node_modules/react-star-ratings';
import { Link } from 'react-router-dom';
import { getReviewById, deleteReview, deleteReviewByHO } from './../../actions/review';
import findDay from '../../utility/findDay';

const ShowReview = ({ userId, houseId, houseOwnerId }) => {
    const dispatch = useDispatch()
    const reviewList = useSelector(state => state.review)

    const dropdownRender = (id, reviewId) => {
        if (id === userId) return <div className="dropdown d-flex justify-content-end">
            <button className="dropbtn text-end"><h5><i className="fas fa-sliders-h" /></h5></button>
            <div className="dropdown-content">
                <div className='text-center'>
                    <Link to={`/house/${houseId}`} onClick={() => dispatch(getReviewById(reviewId))} className='item'> Edit Your Review</Link>
                </div>
                <div className='text-center'>
                    <Link to={`/house/${houseId}`} className='item' onClick={() => dispatch(deleteReview(reviewId))} >Delete Your Review</Link>
                </div>
            </div>
        </div>

        else if (houseOwnerId === userId) return <div className="dropdown d-flex justify-content-end">
            <button className="dropbtn text-end"><h5><i className="fas fa-sliders-h" /></h5></button>
            <div className="dropdown-content">
                <div className='text-center'>
                    <Link to={`/house/${houseId}`} className='item' onClick={() => dispatch(deleteReviewByHO(reviewId))}>Delete This Review</Link>
                </div>
            </div>
        </div>
        else return <div></div>
    }

    if (!reviewList) return <div></div>
    else return reviewList.map(review => {
        return <div className='review-box mb-0' key={review._id}>
            <div className="row">
                <div className="col-9">
                    <h4>{review.reviewerName}</h4>

                    <StarRatings
                        rating={review.ratings}
                        starRatedColor="#d84c4d"
                        numberOfStars={5}
                        name='ratings'
                        starDimension='18px'
                        starSpacing='3px'
                    />
                </div>
                <div className="col-3">
                    {dropdownRender(review.reviewerId, review._id)}
                </div>
            </div>

            <p className='description'>{review.review}</p>
            <p style={{color:'#d84c4d',paddingBottom:'10px'}}>{findDay(review.createdAt.slice(0, 10))}</p>
        </div>
    }
    );
}

export default ShowReview;