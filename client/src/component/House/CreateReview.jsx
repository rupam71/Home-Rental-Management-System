import React,{useState,useEffect} from 'react';
import Input from './../Input';
import StarRatings from '../../../node_modules/react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, editOldReview } from './../../actions/review';

const CreateReview = ({houseId,userName}) => {
    const editReviewStatus = useSelector(state=>state.editReview.edit)
    const editReview = useSelector(state=>state.editReview)
    const reviewList = useSelector(state=>state.review)
    const dispatch = useDispatch()
    const [reviewState, setreviewState] = useState({
        ratings:1,
        review:''
    });
    useEffect(() => {
        if(editReviewStatus) setreviewState({
            ratings:editReview.review.ratings,
            review:editReview.review.review
        })
        // eslint-disable-next-line
    }, [editReview.review._id]);
    useEffect(() => {
        if(!editReviewStatus) setreviewState({
            ratings:1,
            review:''
        })
    }, [editReviewStatus]);
    useEffect(() => {
        setreviewState({
            ratings:1,
            review:''
        })
    }, [reviewList.length]);
    const handleSubmit = e => {
        e.preventDefault();

        if(editReviewStatus) dispatch(editOldReview(editReview.review._id,reviewState))
        else dispatch(createReview({...reviewState,houseId}))
    }
    const changeRating = ( newRating, name )=>{
        setreviewState({...reviewState, ratings: newRating})
      }
    return ( 
        <div className='review-box'>
            <h4>Give Ratings as {userName}</h4>
            <StarRatings
                rating={reviewState.ratings}
                starRatedColor="#d84c4d"
                changeRating={changeRating}
                numberOfStars={5}
                name='ratings'
                starDimension='30px'
                starSpacing='5px'
                />

            <form type="submit" onSubmit={handleSubmit} className='mt-2 mb-5'>
                <div className="form-row">
                    <Input width="full"
                        change={e=>setreviewState({...reviewState, review:e})}
                        type="text" label='Review' value={reviewState.review}/>
                </div>
            </form>
        </div>
     );
}
 
export default CreateReview;