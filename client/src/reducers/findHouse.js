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
    houseImagesLength:0,
    bookmarkedBy:[]
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
        case 'EMPTYHOUSE' : return [initialilState];
        case 'AVAILABLE_HOUSE' :  return state.filter(house=> house.houseStatus !== 'rented')
        case 'SEARCH_HOUSE' :  return state.filter(house=>{
            if(action.payload.totalRoomNo && action.payload.rentFee && action.payload.size) return house.totalRoomNo === action.payload.totalRoomNo && house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1 && house.size <= action.payload.size && house.rentFee <= action.payload.rentFee          
            else if(action.payload.totalRoomNo && action.payload.rentFee) return house.totalRoomNo === action.payload.totalRoomNo && house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1 && house.rentFee <= action.payload.rentFee
            else if(action.payload.totalRoomNo && action.payload.size) return house.totalRoomNo === action.payload.totalRoomNo && house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1 && house.size <= action.payload.size
            else if(action.payload.rentFee && action.payload.size) return house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1 && house.size <= action.payload.size && house.rentFee <= action.payload.rentFee
            else if(action.payload.totalRoomNo) return house.totalRoomNo === action.payload.totalRoomNo && house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1
            else if(action.payload.size) return house.size <= action.payload.size && house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1
            else if(action.payload.rentFee) return house.rentFee <= action.payload.rentFee && house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1
            else return house.houseAddress.toLowerCase().indexOf(action.payload.houseAddress.toLowerCase()) !== -1
        })
        default : return state;
    }
}