const initialState = {
    status : null,
    tickets : []
}

export default function support (state= initialState, action){
    switch(action.type){
        case 'CREATE_SUPPORT_TICKET' : return {
            status : 'sent',
            tickets : [ ...state.tickets, action.payload]
        }
        case 'CHANGE_STATUS' : return {...state, status : null}
        case 'GET_SUPPORT_TICKET' : return {...state, tickets : action.payload}
        default : return state;
    }
}