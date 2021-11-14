export default function user (state=[],action){
    switch(action.type){
        case 'USER_PROFILE' : return [action.payload];
        default : return state;
    }
}