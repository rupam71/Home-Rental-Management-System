export default function reviewReducer(state=[],action){
    switch(action.type){
        case 'CREATE_REVIEW' : return [...state,action.payload]
        case 'GET_REVIEW' : return action.payload
        case 'EDIT_REVIEW_' : return state.map(review=>{
            if(review._id === action.payload._id) return action.payload
            else return review
        })
        case 'DELETE_REVIEW' : return state.filter(review => review._id !== action.payload._id)
        default : return state
    }
}