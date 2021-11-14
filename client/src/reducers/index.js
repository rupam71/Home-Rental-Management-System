import {combineReducers} from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer';
import findHouse from './findHouse';
import user from './userReducer';
import reviewReducer from './reviewReducer';
import editReview from './editReview';
import rent from './rent';
import support from './support';
import image from './image';

export default combineReducers({
    error : errorReducer,
    auth : authReducer,
    house : findHouse,
    review:reviewReducer,
    user,
    editReview,
    rent,
    support,
    image
})