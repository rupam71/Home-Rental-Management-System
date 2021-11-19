const initialState = {
    review:{
        _id:null
    },
    edit:false
}

export default function editReview (state = initialState , action) { 
    switch(action.type) {
        case 'EDIT_REVIEW' : return {
            review:action.payload,
            edit:true
        }
        case 'SUBMIT_EDIT_REVIEW' : return {
            review:{_id:null},
            edit:false
        }  
        default : return state;
    }
}