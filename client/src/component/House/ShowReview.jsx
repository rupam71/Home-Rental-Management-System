import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StarRatings from '../../../node_modules/react-star-ratings';
import { Link } from 'react-router-dom';
import { getReviewById, deleteReview, deleteReviewByHO } from './../../actions/review';

const ShowReview = ({ userId, houseId, houseOwnerId }) => {
    const dispatch = useDispatch()
    const reviewList = useSelector(state => state.review)

    const dropdownRender = (id, reviewId) => {
        if (id === userId) return <div className="dropdown d-flex justify-content-end">
            <button className="dropbtn text-end"><h2><i className="fas fa-sliders-h" /></h2></button>
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
            <button className="dropbtn text-end"><h2><i className="fas fa-sliders-h" /></h2></button>
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
        return <div className='mt-2 review-box' key={review._id}>
            <div className="row">
                <div className="col-9">
                    <h3>{review.reviewerName}</h3>

                    <StarRatings
                        rating={review.ratings}
                        starRatedColor="blue"
                        numberOfStars={5}
                        name='ratings'
                        starDimension='30px'
                        starSpacing='5px'
                    />
                </div>
                <div className="col-3">
                    <p>{review.createdAt.slice(0, 10)}</p>
                    {dropdownRender(review.reviewerId, review._id)}
                </div>
            </div>


            <h3 className='description'>{review.review}</h3>
        </div>
    }
    );
}

export default ShowReview;