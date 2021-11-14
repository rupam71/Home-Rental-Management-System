export default function rent (state=[],action){
    switch(action.type){
        case 'CREATE_RENT' : return [action.payload]
        case 'GET_ALL_RENT': return action.payload
        default : return state;
    }
}