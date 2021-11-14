const initialilState = {
    _id:'',
    houseAddress:'',
    description:'',
    totalRoomNo:'',
    bedRoom:'',
    totalToilet:'',
    totalbalcony:'',
    size:'',
    rentFee:'',
    addittionalCharge:'',
    totalView:'',
    totalRented:'',
    houseOwnerId:'',
    createdAt :'',
    houseImages:''
}

export default function findHouse (state=[initialilState],action){
    switch(action.type){
        case 'HOUSELIST' : return action.payload;
        case 'SHOWHOUSE' : return [action.payload];
        case 'HOUSE_DELETE' : return state.filter(house=> house._id !== action.payload._id)
        case 'HOUSE_EDIT' : return state.map(house=>{
                                if(house._id === action.payload._id){
                                    return action.payload;                                    
                                } else {
                                    return house;
                                }
        })
        case 'AVAILABLE_HOUSE' :  return state.filter(house=> house.houseStatus !== 'rented')
        default : return state;
    }
}