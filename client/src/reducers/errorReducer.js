export default function errorReducer (state = [] , action) { 
    switch(action.type) {
        case 'NEW_ERROR' : return [...state, action.payload]  
        case 'REMOVE_ERROR': return state.filter(alert => alert.id !== action.payload)
        default : return state;
    }
}